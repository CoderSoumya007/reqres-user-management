"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, ArrowLeft } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { fetchUser, updateUser } from "@/lib/api"
import type { User } from "@/lib/types"

export default function EditUserPage() {
  const [user, setUser] = useState<User | null>(null)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const params = useParams()
  const { isAuthenticated } = useAuth()
  const { toast } = useToast()
  const userId = params.id as string

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    const loadUser = async () => {
      setIsLoading(true)
      setError("")
      try {
        const userData = await fetchUser(userId)
        setUser(userData.data)
        setFirstName(userData.data.first_name)
        setLastName(userData.data.last_name)
        setEmail(userData.data.email)
      } catch (err) {
        setError("Failed to load user data. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()
  }, [isAuthenticated, userId, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsSaving(true)

    try {
      await updateUser(userId, { first_name: firstName, last_name: lastName, email })
      toast({
        title: "User updated",
        description: "User information has been updated successfully.",
      })
      router.push("/users")
    } catch (err) {
      setError("Failed to update user. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Button variant="ghost" className="mb-6" onClick={() => router.push("/users")}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Users
      </Button>

      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Edit User</CardTitle>
          <CardDescription>Update user information</CardDescription>
        </CardHeader>

        {isLoading ? (
          <CardContent className="flex justify-center py-6">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </CardContent>
        ) : (
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
            </CardContent>

            <CardFooter className="flex justify-between">
              <Button type="button" variant="outline" onClick={() => router.push("/users")}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </form>
        )}
      </Card>
    </div>
  )
}

