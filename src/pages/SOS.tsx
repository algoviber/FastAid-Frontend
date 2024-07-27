
const SOS = () => {
  return (

    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <button style={{
                width: '80%',
                backgroundColor: '#ff4c4c',
                color: 'white',
                border: 'none',
                padding: '15px 30px',
                fontSize: '18px',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e60000'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ff4c4c'}
            >
                Send SOS ?
            </button>
    </div>
  )
}

export default SOS