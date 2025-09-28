import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props){ 
    super(props); 
    this.state = { hasError:false, err:null, info:null }; 
  }
  static getDerivedStateFromError(err){ return { hasError:true, err }; }
  componentDidCatch(err, info){ 
    console.error('[Render error]', err, info); 
    this.setState({ info }); 
  }
  render(){
    if(this.state.hasError){
      return (
        <section className="container">
          <h2>Something went wrong</h2>
          <pre style={{whiteSpace:'pre-wrap', background:'#fff', padding:12, border:'1px solid #eee', borderRadius:8}}>
{String(this.state.err && (this.state.err.stack || this.state.err))}
          </pre>
          <p style={{color:'var(--muted)'}}>Fix the file/line above. The app stays up so you can navigate.</p>
        </section>
      );
    }
    return this.props.children;
  }
}
