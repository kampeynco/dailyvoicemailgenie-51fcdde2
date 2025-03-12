
import { useState } from "react";
import { useSignUp } from "@/contexts/SignUpContext";
import { useToast } from "@/components/ui/use-toast";
import { useVoicemailUploader } from "@/hooks/useVoicemailUploader";
import VoicemailHeader from "./voicemail/VoicemailHeader";
import VoicemailUploadSection from "./voicemail/VoicemailUploadSection";
import SubmitButtonSection from "./committees/SubmitButtonSection";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VoicemailStepProps {
  onComplete: () => Promise<void>;
  isSubmitting: boolean;
  error?: string | null;
}

const VoicemailStep = ({ onComplete, isSubmitting, error }: VoicemailStepProps) => {
  const { updateData, prevStep } = useSignUp();
  const { toast } = useToast();
  const [voicemailFile, setVoicemailFile] = useState<File | null>(null);
  const { isUploading, setIsUploading } = useVoicemailUploader();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!voicemailFile) {
      toast({
        title: "Missing Voicemail",
        description: "Please record or upload a voicemail message.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsUploading(true);
      updateData({ voicemailFile });
      await onComplete();
    } catch (error: any) {
      console.error("Form submission error:", error);
      toast({
        title: "Sign Up Failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSkipVoicemail = async () => {
    updateData({ voicemailFile: null });
    await onComplete();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <VoicemailHeader />
        
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {error}
              <p className="mt-2">Please try again or you can skip adding a voicemail for now.</p>
              <div className="mt-4 flex space-x-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleSkipVoicemail}
                  disabled={isSubmitting || isUploading}
                >
                  Skip for now
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting || isUploading || !voicemailFile}
                >
                  Try again
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}
        
        <VoicemailUploadSection onVoicemailUpdate={setVoicemailFile} />
        
        {!error && (
          <SubmitButtonSection 
            isSubmitting={isSubmitting || isUploading} 
            onBack={prevStep} 
          />
        )}
      </div>
    </form>
  );
};

export default VoicemailStep;
