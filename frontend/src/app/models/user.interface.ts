
/**
 * Information representing a user
 */
export interface User {
  id: string,
  first_name: string,
  last_name: string,
  email_address: string,
}

/**
 * Available filtering options for users
 */
export interface UserFilters {
  ids?: string[],
  emails?: string[],
  user_types?: string[]
}
