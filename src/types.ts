export type UserProfileType = {
  id: string;
  full_name: string;
  age: number;
  gender: string;
  bio: string;
  interests: string[];

  profile_complete: boolean;
  created_at: Date;
  updated_at: Date;
};