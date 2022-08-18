import { Component, createSignal, onCleanup, Show } from 'solid-js';
import { fix, getSettings, updateSettings } from './utils';

const Settings: Component = () => {
  const values = getSettings();
  const [bench, setBench] = createSignal(values.bench ?? 0);
  const [squat, setSquat] = createSignal(values.squat ?? 0);
  const [lastUpdated, setLastUpdated] = createSignal(values.lastUpdatedTimestamp ?? null);
  const [saved, setSaved] = createSignal(false);

  const handleBenchChange = (e: InputEvent) => {
    const value = Number((e.currentTarget as HTMLInputElement).value);
    setBench(fix(value));
  };

  const handleSquatChange = (e: InputEvent) => {
    const value = Number((e.currentTarget as HTMLInputElement).value);
    setSquat(fix(value));
  };

  let timeoutId: NodeJS.Timeout;
  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (typeof bench() !== 'number' || typeof squat() !== 'number') {
      alert('there was an issue');
      return;
    }

    const updateTimeStamp = Date.now();
    updateSettings({ bench: bench(), squat: squat(), lastUpdatedTimestamp: updateTimeStamp });
    setLastUpdated(updateTimeStamp);
    setSaved(true);

    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  onCleanup(() => {
    clearTimeout(timeoutId);
  });

  const getLastUpdatedTime = () => {
    const curr = lastUpdated();
    if (curr) {
      return new Date(curr).toLocaleDateString();
    }
    return '';
  };

  return (
    <main class="p-4">
      <form onSubmit={handleSubmit}>
        <div class="space-y-4">
          <ul class="space-y-4">
            <li>
              <label class="flex flex-col">
                <span>Bench Training Max</span>
                <input value={bench()} type="number" pattern="[0-9]*" onInput={handleBenchChange} />
              </label>
            </li>

            <li>
              <label class="flex flex-col">
                <span>Squat Training Max</span>
                <input value={squat()} type="number" pattern="[0-9]*" onInput={handleSquatChange} />
              </label>
            </li>
          </ul>

          <div>
            <button type="submit">Update</button>
            {saved() ? <span style={{ 'margin-left': '1rem' }}>Saved!</span> : null}
          </div>

          <Show when={getLastUpdatedTime()}>
            <div style={{ 'margin-top': '1rem' }}>Last Updated: {getLastUpdatedTime()}</div>
          </Show>
        </div>
      </form>
    </main>
  );
};

export default Settings;
