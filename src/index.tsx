/* @refresh reload */
import { Route, Router, Routes } from '@solidjs/router';
import { render } from 'solid-js/web';
import { Nav } from './Nav';
import { lazy } from 'solid-js';
import './index.css';

const Home = lazy(() => import('./Home'));
const Settings = lazy(() => import('./Settings'));

render(
  () => (
    <Router>
      <div class="h-screen flex flex-col">
        <div class="overflow-auto">
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
