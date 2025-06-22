import type { ReactNode } from "react";

export interface Origin {
  name: string;
  url: string;
}

export interface Location {
  name: string;
  url: string;
}
export interface HeroData {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Origin;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface LocationData {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

export interface EpisodeData {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

export type User = {
  name: string;
  password?: string;
} | null;

export type AuthContextType = {
  user: User;
  signIn: (newUser: Exclude<User, null>, callback: () => void) => void;
  signOut: () => void;
};

export type AuthProviderProps = {
  children: ReactNode;
};

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
}

export type Resource = "/character" | "/location" | "/episode";

export interface EntityWithId {
  id: number | string;
}
