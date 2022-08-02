import { Component, createEffect, createSignal, For } from 'solid-js';

const key = '$$s$$';
const coefficient = 2.20462;
const fix = (value: number) => Number(value.toFixed(2));

const PERCENTAGES = [65, 70, 75, 80, 85, 90].map((n) => n / 100);
const calculateOneRepMax = (weight: number, reps: number) => {
  const value = weight + (weight / 30) * reps;
  return fix(value);
};

const App: Component = () => {
  const values = JSON.parse(localStorage.getItem(key) ?? '{}');
  const [kgs, setKg] = createSignal(values.kgs ?? 0);
  const [lbs, setLbs] = createSignal(values.lbs ?? 0);
  const [max, setMax] = createSignal(values.max ?? 0);

  function updateLbsFromKg() {
    setLbs(fix(kgs() * coefficient));
  }

  function updateKgFromLbs() {
    setKg(fix(lbs() / coefficient));
  }

  function kgPlus() {
    setKg(kgs() + 1);
    updateLbsFromKg();
  }

  function kgMinus() {
    setKg(kgs() - 1);
    updateLbsFromKg();
  }

  function handleKgsChange(event: InputEvent) {
    const kgs = Number((event.currentTarget as HTMLInputElement).value);
    setKg(kgs);
    updateLbsFromKg();
  }

  function lbsPlus() {
    setLbs(lbs() + 1);
    updateKgFromLbs();
  }

  function lbsMinus() {
    setLbs(lbs() - 1);
    updateKgFromLbs();
  }

  function handleLbsChange(event: InputEvent) {
    const lbs = Number((event.currentTarget as HTMLInputElement).value);
    setLbs(lbs);
    updateKgFromLbs();
  }

  createEffect(() => {
    localStorage.setItem(
      key,
      JSON.stringify({
        kgs: kgs(),
        lbs: lbs(),
        max: max(),
      })
    );
  });

  return (
    <main>
      <div>
        <label class="field">
          <span>Training Max (lbs)</span>

          <input
            value={max()}
            type="number"
            pattern="[0-9]*"
            onInput={(e) => setMax(Number(e.currentTarget.value))}
          />
        </label>
      </div>

      <table>
        <thead>
          <tr>
            <th>Percentage</th>
            <th>Weight (lbs)</th>
            <th>Weight (kg)</th>
          </tr>
        </thead>
        <tbody>
          <For each={PERCENTAGES}>
            {(percentage) => (
              <tr>
                <td>{percentage * 100}%</td>
                <td>{fix(max() * percentage)}</td>
                <td>{fix((max() * percentage) / coefficient)}</td>
              </tr>
            )}
          </For>
        </tbody>
      </table>

      <ul style={{ 'margin-top': '4rem' }}>
        <li>
          <label class="field">
            <span>Kilograms</span>
            <input value={kgs()} type="number" pattern="[0-9]*" onInput={handleKgsChange} />
          </label>
          <button onClick={kgPlus}>+</button>
          <button onClick={kgMinus}>-</button>
        </li>

        <li>
          <label class="field">
            <span>Pounds</span>
            <input value={lbs()} type="number" pattern="[0-9]*" onInput={handleLbsChange} />
          </label>
          <button onClick={lbsPlus}>+</button>
          <button onClick={lbsMinus}>-</button>
        </li>
      </ul>
    </main>
  );
};

export default App;
