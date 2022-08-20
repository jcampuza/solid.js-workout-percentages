import { Component, createEffect, createSignal, For } from 'solid-js';
import { getSettings } from './utils';

const key = '$$s$$';
const coefficient = 2.20462;
const fix = (value: number) => Number(value.toFixed(2));
const PERCENTAGES = [65, 70, 75, 80, 85, 90, 95].map((n) => n / 100);

const Home: Component = () => {
  const values = JSON.parse(localStorage.getItem(key) ?? '{}');
  const [kgs, setKg] = createSignal(values.kgs ?? 0);
  const [lbs, setLbs] = createSignal(values.lbs ?? 0);
  const [max, setMax] = createSignal(values.max ?? 0);

  const maxInKg = () => max() / coefficient;

  const updateLbsFromKg = () => {
    setLbs(fix(kgs() * coefficient));
  };

  const updateKgFromLbs = () => {
    setKg(fix(lbs() / coefficient));
  };

  const kgPlus = () => {
    setKg(kgs() + 1);
    updateLbsFromKg();
  };

  const kgMinus = () => {
    setKg(kgs() - 1);
    updateLbsFromKg();
  };

  const handleKgsChange = (event: InputEvent) => {
    const kgs = Number((event.currentTarget as HTMLInputElement).value);
    setKg(kgs);
    updateLbsFromKg();
  };

  const lbsPlus = () => {
    setLbs(lbs() + 1);
    updateKgFromLbs();
  };

  const lbsMinus = () => {
    setLbs(lbs() - 1);
    updateKgFromLbs();
  };

  const handleLbsChange = (event: InputEvent) => {
    const lbs = Number((event.currentTarget as HTMLInputElement).value);
    setLbs(lbs);
    updateKgFromLbs();
  };

  const useSquatMax = () => {
    const { squat } = getSettings();
    setMax(squat);
  };

  const useBenchMax = () => {
    const { bench } = getSettings();
    setMax(bench);
  };

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
    <main class="p-4">
      <div class="space-y-2">
        <label class="flex flex-col">
          <span>Training Max (lbs)</span>

          <input
            value={max()}
            type="number"
            pattern="[0-9]*"
            onInput={(e) => setMax(Number(e.currentTarget.value))}
          />
        </label>
        <div class="flex gap-2">
          <button onClick={useSquatMax}>Use Squat Max</button>
          <button onClick={useBenchMax}>Use Bench Max</button>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>%</th>
            <th>kg</th>
            <th>kg -&gt; lbs</th>
            <th>%</th>
          </tr>
        </thead>
        <tbody>
          <For each={PERCENTAGES}>
            {(percentage) => {
              const roundedAmountKg = () =>
                fix(Math.round((max() * percentage) / coefficient / 2.5) * 2.5);

              const roundedAmountLbs = () => fix(roundedAmountKg() * coefficient);

              const actualPercent = () => fix(roundedAmountKg() / maxInKg());

              return (
                <tr>
                  <td>{percentage * 100}%</td>
                  <td>{roundedAmountKg()}</td>
                  <td>{roundedAmountLbs()}</td>
                  <td>{actualPercent()}%</td>
                </tr>
              );
            }}
          </For>
        </tbody>
      </table>

      <ul class="space-y-4">
        <li class="space-y-2">
          <label class="flex flex-col">
            <span>Kilograms</span>
            <input value={kgs()} type="number" pattern="[0-9]*" onInput={handleKgsChange} />
          </label>

          <div class="flex gap-2">
            <button onClick={kgPlus}>+</button>
            <button onClick={kgMinus}>-</button>
          </div>
        </li>

        <li class="space-y-2">
          <label class="flex flex-col">
            <span>Pounds</span>
            <input value={lbs()} type="number" pattern="[0-9]*" onInput={handleLbsChange} />
          </label>
          <div class="flex gap-2">
            <button onClick={lbsPlus}>+</button>
            <button onClick={lbsMinus}>-</button>
          </div>
        </li>
      </ul>
    </main>
  );
};

export default Home;
