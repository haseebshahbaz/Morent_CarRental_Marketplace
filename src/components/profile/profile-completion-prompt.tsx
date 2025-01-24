import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ProfileCompletionPromptProps {
  onComplete: () => void
}

export function ProfileCompletionPrompt({ onComplete }: ProfileCompletionPromptProps) {
  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardHeader>
        <CardTitle className="text-blue-800">Complete Your Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-blue-600 mb-4">
          Your profile is incomplete. Please take a moment to fill in the missing information to enhance your
          experience.
        </p>
        <Button onClick={onComplete} className="bg-blue-700 hover:bg-blue-900">Complete Profile</Button>
      </CardContent>
    </Card>
  )
}

