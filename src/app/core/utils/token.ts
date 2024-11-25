



export const validateToken = (token: string): boolean => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
}


export const tokenTest = "eyJpZGVudGlmaWNhdGlvbkRldmljZSI6IkFETUlOIiwiaWRlbnRpZmljYXRpb25OdW1iZXIiOiJwYWJsbyIsImlkZW50aWZpY2F0aW9uVHlwZSI6IkpXVCIsImFsZyI6IkhTNTEyIn0.eyJqdGkiOiJiYW5jb0FQSUpXVCIsInN1YiI6InBhYmxvIiwiYXV0aG9yaXRpZXMiOlsiV1JJVEUiLCJSRUFEIiwiQURNSU4iXSwiaWF0IjoxNzMyNTQ2MDAyLCJleHAiOjE3MzI2MjQwMDJ9.S72AWI__i_9PR04xAPwdq7EcbZ-kLewZ5Ft4ORGT3zb6XWlgHiVobTz1gJ1zlTtV8koP2USUhCcvv3t0i4dxtA"