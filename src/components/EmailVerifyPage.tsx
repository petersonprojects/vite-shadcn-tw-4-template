/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface VerifyResponse {
  code: number;
  [key: string]: any;
}

export default function EmailVerifyPage() {
  // Access the route parameter
  const { token } = useParams<{ token: string }>();

  const [didVerifyWork, setDidVerifyWork] = useState<boolean>(false);

  // useEffect that calls the back end route to verify
  useEffect(() => {
    async function pogChampion(): Promise<void> {
      const resp = await fetch("/verify-email",
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        }
      );

      const response: VerifyResponse = await resp.json();

      if (response.code === 1) {
        setDidVerifyWork(true);
      }
      else {
        setDidVerifyWork(false);
      }

      console.log(response);
    }

    pogChampion();
  }, [token]);

  return (<>
    {didVerifyWork ?
      <div>Verified Successfully</div>
      : <div>Not Successful</div>
    }
  </>
  );
}
