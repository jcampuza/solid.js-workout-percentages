/* @refresh reload */
import { Link, Route, Router, Routes } from '@solidjs/router';
import { render } from 'solid-js/web';
import Settings from './Settings';
import Home from './Home';
import './index.css';

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

        <nav
          style={{
            'margin-top': 'auto',
            'border-top': '1px solid rebeccapurple',
            display: 'flex',
            'align-items': 'center',
            'justify-content': 'space-around',
          }}
        >
          <Link
            href="/"
            title="Home"
            style={{
              padding: '1rem',
              'text-align': 'center',
              width: '100%',
              'border-right': '1px solid rebeccapurple',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width={2}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </Link>
          <Link
            href="/settings"
            title="Settings"
            style={{
              padding: '1rem',
              'text-align': 'center',
              width: '100%',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              fill="rebeccapurple"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width={2}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </Link>
        </nav>
      </div>
    </Router>
  ),
  document.getElementById('root') as HTMLElement
);
