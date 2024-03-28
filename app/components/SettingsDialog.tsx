import { useContext } from "react";
import ThemeSelector from "./ThemeSelector";
import { ThemeContext } from "./Providers";

export default function SettingsDialog() {
  const { theme, setTheme, themes } = useContext(ThemeContext);
  return (
    <dialog id="settings" className="modal">
      <div className="modal-box min-h-96 w-11/12 max-w-1xl">
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-lg btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
        </div>
        <div className="prose">
          <h2 className="font-bold text-lg">Asetukset</h2>
        </div>
        {theme && (
          <ThemeSelector theme={theme} themes={themes} setTheme={setTheme} />
        )}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
