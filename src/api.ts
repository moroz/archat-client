export const BASE_URL = import.meta.env.VITE_API_URL;

export interface SignInParams {
  username: string;
  password: string;
}

export interface SignInResult {
  access_token: string;
}

export const signIn = async (username: string, password: string) => {
  const payload: SignInParams = {
    username,
    password
  };

  try {
    const result = await fetch(`${BASE_URL}/api/sign_in`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "content-type": "application/json"
      }
    });

    const json = (await result.json()) as SignInResult;
    return json.access_token;
  } catch (e) {
    return null;
  }
};
