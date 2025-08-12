import './services/styles/App.css'
import Routers from './services/routes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
          <Routers />
      </QueryClientProvider>
    </>
  )
}

export default App
