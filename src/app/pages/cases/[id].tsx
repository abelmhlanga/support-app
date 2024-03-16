import { useState } from 'react';
import { useRouter } from 'next/router';
import { PrimaryButton, TextField, Text } from '@fluentui/react';
import { CaseDetailsType } from '../../types/caseDetails';
 // Import the CaseDetailsType interface or type definition


const CaseDetailPage =  ({ caseDetails }: { caseDetails: CaseDetailsType })  => {
  const [comment, setComment] = useState('');
  const [file, setFile] = useState(null);
  const router = useRouter();
const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
};

const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };

const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const id = router.query.id as string; // Add the missing declaration for the 'id' variable
    // Submit comment
    const formData = new FormData();
    await fetch('/api/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ caseId: id, comment }),
    });
    // Upload file
    if (file) {
        formData.append('file', file);
    }
    await fetch('/api/uploads', {
        method: 'POST',
        body: formData,
    });
    // Refresh the page to show the new comment and attachment
    router.reload();
  };

  return (
<div>
    <Text variant="xLarge">{caseDetails.title}</Text>
    <Text variant="medium">{caseDetails.description}</Text>
    {/* Display other case details */}
    <form onSubmit={handleSubmit}>
        <TextField
            multiline
            autoAdjustHeight
            value={comment}
            onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => handleCommentChange(event as any)}
            //this part should be checked again to handle inputelement or text area element specifically 
        />
        <input type="file" onChange={handleFileChange} />
        <PrimaryButton type="submit">Submit</PrimaryButton>
    </form>
</div>
  );
};

export default CaseDetailPage