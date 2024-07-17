# How to use this template

## Documentation for libraries
- [Nuxt 3](https://nuxt.com/docs/getting-started/introduction)
- [Nuxt UI - Components library](https://ui.nuxt.com/getting-started)
- [TailwindCSS - CSS Framework](https://tailwindcss.com/docs/configuration)
- [VueUse - Set of composable functions for Vue 3 with TS](https://vueuse.org/functions.html)
- [Pinia - State management library](https://pinia.vuejs.org/introduction.html)
- [Zod - Validation](https://pinia.vuejs.org/introduction.html)

## Setup

Make sure to install the dependencies. We use `pnpm` as a package manager:

```bash
pnpm install
```

### Development Server

Start the development server on `http://localhost:3000`:

```bash
pnpm run dev
```

### Production

Locally preview production build:

```bash
pnpm run preview
```

## Template structure

Generally it uses [default Nuxt 3 project structure](https://nuxt.com/docs/guide/directory-structure) with next additional folders:

- [`api`](/api) - Stores definition of api services (repositories)
- [`types`](/types) - Stores type definitions used for business logic, events definition in [`types/events`](/types/events) and utility types in [`types/utils.ts`](/types/utils.ts)

## Api services

Api interaction logic is located in [`/api`](/api) folder in grouped by services.

Example of service
```ts
import { createService } from '~/api'
import type { EndpointOptions } from '~/api'
import type { User } from '~/types/user'

type LoginRequest = {
  email: string
  password: string
}

type GoogleLoginRequest = {
  token: string
  redirect_uri: string
}

export type AuthTokenResponse = {
  access_token: string
  refresh_token: string
  token_type: 'bearer'
}

export const authService = createService(({ $api, $apiUnauthenticated }) => ({
  login: (options: EndpointOptions<LoginRequest>) => {
    const { body, ...rest } = options

    const formData = new FormData()
    formData.append('username', body.email)
    formData.append('password', body.password)

    return $apiUnauthenticated<AuthTokenResponse>('/api/frontend/user/token', {
      method: 'POST',
      body: formData,
      ...rest
    })
  },
  googleLogin: (options: EndpointOptions<GoogleLoginRequest>) => {
    return $apiUnauthenticated<AuthTokenResponse>('/api/frontend/user/google', {
      method: 'POST',
      ...options
    })
  },
  currentUser: (options?: EndpointOptions) => {
    return $api<User>('/api/frontend/user/', options)
  }
}))
```
### Method options

`EndpointOptions` is generic type, has two params
- `TBody` - Define type of request body. `body` param will be required if not set to undefined (as by default)
- `TUrl` - Define params that will be used to build url or required query params.

### How to make request inside service
When you define new service with [`createService()`](/api/index.ts#L28) method it will provide you with two methods:
- `$api` - Make request with Authorization header, refresh token on 401 error code (if refresh token was previously set)
- `$apiUnauthenticated` - Make request without Authorization header

### Make api request in business code
```vue
<script setup lang="ts">
import { authService } from '~/api/auth'

const login = (data) => {
  const credentials = await authService().login({
    body: data
  })

  // ...
}
</script>
```

## Composables

### [useApi](/composables/useApi.ts)
Stores functions used in API Services to make requests

### [useForm](/composables/useForm.ts)
Used to interact with form and validation. [Example of use](/components/Auth/AuthLoginForm.vue).

### [useMitt](/composables/useMitt.ts)
Composable for event bus. Uses [Mitt library](https://github.com/developit/mitt).

#### Usage
```ts
const { emit, on } = useMitt()

emit('banner:focus', {
  bannerId: 123
})

on('banner:focus', ({ bannerId }) => {
  // ...
})
```

#### Events declaration
Events are declared in [`types/events/index.ts`](/types/events/index.ts) or any other files in [`types/events`](/types/events) folder that **must be reimported** in index.ts file.<br>

Recommended event name format - `event-prefix:event-name`

For example
- `upload-modal:preselect-location`
- `auth:logout`

## Components

Template has two group of predefined components - for basic auth system and UI elements.

### UI elements
> ❗ After installation change the prefix for components from T (**T**emplate) to any desired.

Stored in [`components/T`](/components/T). Generally components styles defined in [`app.config.ts`](/app.config.ts). Wrappers are added to simplify and clarify props for later usage.
