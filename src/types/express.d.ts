export interface AuthUserPayload {
  id: string;
  email: string;
  role: "admin" | "superadmin";
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUserPayload;
    }
  }
}

export {};
