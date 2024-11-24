



export const validateToken = (token: string): boolean => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
}


export const tokenTest = "eyJpZGVudGlmaWNhdGlvbkRldmljZSI6IkFETUlOIiwiaWRlbnRpZmljYXRpb25OdW1iZXIiOiJwYWJsbyIsImlkZW50aWZpY2F0aW9uVHlwZSI6IkpXVCIsImFsZyI6IkhTNTEyIn0.eyJqdGkiOiJiYW5jb0FQSUpXVCIsInN1YiI6InBhYmxvIiwiYXV0aG9yaXRpZXMiOlsiV1JJVEUiLCJSRUFEIiwiQURNSU4iXSwiaWF0IjoxNzMyNDU3NzIwLCJleHAiOjE3MzI1MzU3MjB9.-hjpA7wD0G9VaSpvC0LA0WGIAg5bgMbUFSNU6wbuyA6VSu95sgF5z0aZc1g9B0BsDYybbjVpjpak4DGF6WeKEg"