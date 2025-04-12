"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface EmailCaptureFormProps {
  onSubmitEmail: (email: string) => void; // Callback function to pass the email up
  isLoading?: boolean; // Optional loading state from parent
}

// Renamed component to reflect its new purpose
export function EmailCaptureForm({ onSubmitEmail, isLoading = false }: EmailCaptureFormProps) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)

    if (!email) {
      setError('Please enter your email address.')
      return
    }

    // Basic email format check (optional but recommended)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    onSubmitEmail(email); // Call the parent function with the email
  }

  return (
    // Adjusted styling for better centering and appearance
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-background p-4"> 
      <Card className="w-full max-w-md mx-auto"> 
        <CardHeader className="text-center"> 
          <CardTitle className="text-2xl font-semibold">Start Intake Process</CardTitle>
          <CardDescription className="mt-1">
            Please enter your email address to begin.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4"> 
            <div className="grid gap-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-describedby="email-error"
                className="text-base" 
              />
              {error && <p id="email-error" className="text-sm text-red-600 mt-1">{error}</p>} 
            </div>
            <Button type="submit" className="w-full !mt-6" disabled={isLoading}> 
              {isLoading ? 'Starting...' : 'Continue'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}