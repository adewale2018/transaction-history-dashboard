export interface MockLoginProps {
  email: string;
  password: string;
}

type MockLoginRes = {
  status: number;
  token?: string;
  message?: string;
}

export const mockLogin = ({ email, password }: MockLoginProps) => {
  return new Promise<MockLoginRes>((resolve, reject) => {
    setTimeout(() => {
      if (email === "admin@gmail.com" && password === "admin") {
        resolve({ status: 200, token: "mock-jwt-token" });
      } else {
        reject({ status: 400, message: "Invalid email or password" });
      }
    }, 2000);
  });
};
