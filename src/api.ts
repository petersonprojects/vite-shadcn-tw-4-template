// API client for connecting to the Vercel-hosted API

// Define types for our data
export interface Verb {
  base: string;
  pastSimple: string;
  pastParticiple: string;
}

export interface TestResult {
  id?: string;
  date: string;
  score: number;
  timeTaken: number;
}

// API base URL from environment variables
// In production with monorepo deployment, this will be a relative path (/api)
// In development, this will be the full URL (http://localhost:3000)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Function to fetch all verbs
export const fetchAllVerbs = async (): Promise<Verb[]> => {

  console.log("API_BASE_URL: ", API_BASE_URL);

  try {
    const response = await fetch(`${API_BASE_URL}/api/verbs`);
    if (!response.ok) {
      throw new Error('Failed to fetch verbs');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching verbs:', error);
    throw error;
  }
};

// Function to fetch a random verb
export const fetchRandomVerb = async (): Promise<Verb> => {
  console.log("API_BASE_URL: ", API_BASE_URL);
  try {
    const response = await fetch(`${API_BASE_URL}/api/verbs/random`);
    if (!response.ok) {
      throw new Error('Failed to fetch random verb');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching random verb:', error);
    throw error;
  }
};

// Function to save a user score
export const saveUserScore = async (
  username: string, 
  score: number, 
  timeTaken: number
): Promise<TestResult> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/scores`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        score,
        timeTaken,
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to save score');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error saving score:', error);
    throw error;
  }
};

// Function to fetch user scores
export const fetchUserScores = async (username: string): Promise<TestResult[]> => {
  console.log("API_BASE_URL: ", API_BASE_URL);
  try {
    const response = await fetch(`${API_BASE_URL}/api/scores/${username}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user scores');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching user scores:', error);
    throw error;
  }
}; 