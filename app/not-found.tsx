export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      backgroundColor: 'black', color: 'white', textAlign: 'center', padding: '2rem'
    }}>
      <div>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>404: Not Found</h1>
        <p>Sorry, the page you’re looking for doesn’t exist.</p>
      </div>
    </div>
  )
}

