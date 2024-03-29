"use client";
import dynamic from "next/dynamic";

export default function MapDialog() {
  const Mapz = dynamic(() => import("./Map"), {
    loading: () => <p>A map is loading</p>,
    ssr: false,
  });
  return (
    <dialog id="map" className="modal">
      <div className="modal-box min-h-96 w-11/12 max-w-1xl">
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-lg btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
        </div>
        <div className="w-full h-full mt-2">
          <Mapz />
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
