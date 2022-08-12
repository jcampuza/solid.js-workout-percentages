/* @refresh reload */
import { Link, Route, Router, Routes } from '@solidjs/router';
import { render } from 'solid-js/web';
import Settings from './Settings';
import Home from './Home';
import './index.css';
import { Nav } from './Nav';

render(
  () => (
    <Router>
      <div
        style={{
          height: '100%',
          display: 'flex',
          'flex-direction': 'column',
        }}
      >
        <div
          style={{
            overflow: 'auto',
          }}
        >
          <Routes>
            <Route path="/" component={Home}></Route>
            <Route path="/settings" component={Settings}></Route>
          </Routes>
        </div>

        <Nav />
      </div>
    </Router>
  ),
  document.getElementById('root') as HTMLElement
);
