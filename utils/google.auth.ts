export const getAuthUrl = (state?: Record<string, any>) => {
  const url = new URL('https://accounts.google.com/o/oauth2/v2/auth')

  const params: Record<string, string> = {
    client_id: useRuntimeConfig().public.google.clientId,
    redirect_uri: `${window.location.origin}/auth/google/callback`,
    response_type: 'code',
    scope: 'email profile'
  }

  if (state)
    params.state = btoa(JSON.stringify(state))

  Object.entries(params)
    .forEach(([key, value]) => url.searchParams.append(key, value))

  return url.toString()
}
