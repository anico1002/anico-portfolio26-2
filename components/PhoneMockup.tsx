"use client";

interface PhoneMockupProps {
  mediaUrl: string;
  isVideo: boolean;
  bgUrl?: string;
  phoneColor?: "black" | "white";
  phoneModel?: "iphone8" | "iphone16";
  palette?: number;
}

const PALETTE_GRADIENTS: Record<number, string> = {
  1: "from-neutral-700 to-neutral-900",
  2: "from-slate-700 to-slate-900",
  3: "from-zinc-700 to-zinc-900",
  4: "from-stone-700 to-stone-900",
  5: "from-gray-700 to-gray-900",
};

/*
 * CSS verbatim from https://github.com/marvelapp/devices.css (MIT)
 * iPhone 8 + custom iPhone 16 rules included.
 * Scaling via --ps CSS variable on .ph-wrap / .ph-wrap.iphone16-model.
 * .ph-scaler applies transform: scale(var(--ps)) to the natural-size device.
 * .ph-wrap reserves the correct layout space at each breakpoint.
 *
 * iPhone 8  natural size: 423 × 877px  (375+48 × 667+210, content-box)
 * iPhone 16 natural size: 417 × 942px  (393+24 × 852+90,  content-box)
 */
const DEVICE_CSS = `
  /* ── iPhone 8 scaling ── */
  .ph-wrap {
    --ps: 0.33;
    display: inline-block;
    position: relative;
    width:  calc(423px * var(--ps));
    height: calc(877px * var(--ps));
  }
  @media (min-width: 640px)  { .ph-wrap { --ps: 0.43; } }
  @media (min-width: 768px)  { .ph-wrap { --ps: 0.52; } }
  @media (min-width: 1024px) { .ph-wrap { --ps: 0.63; } }

  .ph-scaler {
    position: absolute;
    top: 0; left: 0;
    width: 423px;
    height: 877px;
    transform: scale(var(--ps));
    transform-origin: top left;
  }

  /* ── iPhone 16 scaling ── */
  .ph-wrap.iphone16-model {
    --ps: 0.31;
    width:  calc(417px * var(--ps));
    height: calc(942px * var(--ps));
  }
  @media (min-width: 640px)  { .ph-wrap.iphone16-model { --ps: 0.40; } }
  @media (min-width: 768px)  { .ph-wrap.iphone16-model { --ps: 0.48; } }
  @media (min-width: 1024px) { .ph-wrap.iphone16-model { --ps: 0.59; } }

  .ph-scaler.iphone16-model {
    position: absolute;
    top: 0; left: 0;
    width: 417px;
    height: 942px;
    transform: scale(var(--ps));
    transform-origin: top left;
  }

  /* ── devices.css base ── */
  .marvel-device {
    display: inline-block;
    position: relative;
    box-sizing: content-box !important;
  }
  .marvel-device .screen {
    width: 100%;
    position: relative;
    height: 100%;
    z-index: 3;
    background: white;
    overflow: hidden;
    display: block;
    border-radius: 1px;
    box-shadow: 0 0 0 2px #bfbfc0;
  }
  .marvel-device .top-bar,
  .marvel-device .bottom-bar {
    height: 3px;
    background: black;
    width: 100%;
    display: block;
  }

  /* ── iPhone 8 (verbatim from devices.css) + outer shadow ── */
  .marvel-device.iphone8 {
    width: 375px;
    height: 667px;
    padding: 105px 24px;
    background: #d9dbdc;
    border-radius: 56px;
    box-shadow:
      inset 0 0 3px 0 rgba(0,0,0,0.2),
      0 24px 60px rgba(0,0,0,0.22),
      0  6px 18px rgba(0,0,0,0.14);
  }
  .marvel-device.iphone8:before {
    width: calc(100% - 12px);
    height: calc(100% - 12px);
    position: absolute;
    top: 6px;
    content: '';
    left: 6px;
    border-radius: 50px;
    background: #f8f8f8;
    z-index: 1;
  }
  .marvel-device.iphone8:after {
    width: calc(100% - 16px);
    height: calc(100% - 16px);
    position: absolute;
    top: 8px;
    content: '';
    left: 8px;
    border-radius: 48px;
    box-shadow: inset 0 0 3px 0 rgba(0,0,0,0.1), inset 0 0 6px 3px #fff;
    z-index: 2;
  }
  .marvel-device.iphone8 .home {
    border-radius: 100%;
    width: 68px;
    height: 68px;
    position: absolute;
    left: 50%;
    margin-left: -34px;
    bottom: 22px;
    z-index: 3;
    background: linear-gradient(135deg, #303233 0%, #b5b7b9 50%, #f0f2f2 69%, #303233 100%);
  }
  .marvel-device.iphone8 .home:before {
    background: #f8f8f8;
    position: absolute;
    content: '';
    border-radius: 100%;
    width: calc(100% - 8px);
    height: calc(100% - 8px);
    top: 4px;
    left: 4px;
  }
  .marvel-device.iphone8 .top-bar {
    height: 14px;
    background: #bfbfc0;
    position: absolute;
    top: 68px;
    left: 0;
  }
  .marvel-device.iphone8 .bottom-bar {
    height: 14px;
    background: #bfbfc0;
    position: absolute;
    bottom: 68px;
    left: 0;
  }
  .marvel-device.iphone8 .sleep {
    position: absolute;
    top: 190px;
    right: -4px;
    width: 4px;
    height: 66px;
    border-radius: 0px 2px 2px 0px;
    background: #d9dbdc;
  }
  .marvel-device.iphone8 .volume {
    position: absolute;
    left: -4px;
    top: 188px;
    z-index: 0;
    height: 66px;
    width: 4px;
    border-radius: 2px 0px 0px 2px;
    background: #d9dbdc;
  }
  .marvel-device.iphone8 .volume:before {
    position: absolute;
    left: 2px;
    top: -78px;
    height: 40px;
    width: 2px;
    border-radius: 2px 0px 0px 2px;
    background: inherit;
    content: '';
    display: block;
  }
  .marvel-device.iphone8 .volume:after {
    position: absolute;
    left: 0px;
    top: 82px;
    height: 66px;
    width: 4px;
    border-radius: 2px 0px 0px 2px;
    background: inherit;
    content: '';
    display: block;
  }
  .marvel-device.iphone8 .camera {
    background: #3c3d3d;
    width: 12px;
    height: 12px;
    position: absolute;
    top: 24px;
    left: 50%;
    margin-left: -6px;
    border-radius: 100%;
    z-index: 3;
  }
  .marvel-device.iphone8 .sensor {
    background: #3c3d3d;
    width: 16px;
    height: 16px;
    position: absolute;
    top: 49px;
    left: 134px;
    z-index: 3;
    border-radius: 100%;
  }
  .marvel-device.iphone8 .speaker {
    background: #292728;
    width: 70px;
    height: 6px;
    position: absolute;
    top: 54px;
    left: 50%;
    margin-left: -35px;
    border-radius: 6px;
    z-index: 3;
  }

  /* ── iPhone 8 black variant ── */
  .marvel-device.iphone8.black {
    background: #464646;
    box-shadow:
      inset 0 0 3px 0 rgba(0,0,0,0.7),
      0 24px 60px rgba(0,0,0,0.48),
      0  6px 18px rgba(0,0,0,0.32);
  }
  .marvel-device.iphone8.black:before { background: #080808; }
  .marvel-device.iphone8.black:after {
    box-shadow: inset 0 0 3px 0 rgba(0,0,0,0.1), inset 0 0 6px 3px #212121;
  }
  .marvel-device.iphone8.black .top-bar,
  .marvel-device.iphone8.black .bottom-bar { background: #212121; }
  .marvel-device.iphone8.black .volume,
  .marvel-device.iphone8.black .sleep      { background: #464646; }
  .marvel-device.iphone8.black .camera     { background: #080808; }
  .marvel-device.iphone8.black .home {
    background: linear-gradient(135deg, #080808 0%, #464646 50%, #080808 100%);
  }
  .marvel-device.iphone8.black .home:before { background: #080808; }
  .marvel-device.iphone8.black .screen { box-shadow: 0 0 0 2px #3c3d3d; }

  /* ── iPhone 16 ── */
  .marvel-device.iphone16 {
    width: 393px;
    height: 852px;
    padding: 55px 12px 35px 12px;
    background: #1c1c1e;
    border-radius: 50px;
    box-shadow:
      inset 0 0 3px 0 rgba(0,0,0,0.7),
      0 24px 60px rgba(0,0,0,0.48),
      0  6px 18px rgba(0,0,0,0.32);
  }
  .marvel-device.iphone16:before {
    width: calc(100% - 8px);
    height: calc(100% - 8px);
    position: absolute;
    top: 4px; left: 4px;
    content: '';
    border-radius: 47px;
    background: #111113;
    z-index: 1;
  }
  .marvel-device.iphone16:after {
    width: calc(100% - 16px);
    height: calc(100% - 16px);
    position: absolute;
    top: 8px; left: 8px;
    content: '';
    border-radius: 43px;
    box-shadow: inset 0 0 3px 0 rgba(0,0,0,0.1), inset 0 0 6px 3px #1a1a1c;
    z-index: 2;
  }
  .marvel-device.iphone16 .screen {
    border-radius: 40px;
    box-shadow: 0 0 0 2px #2a2a2c;
  }
  /* Dynamic Island */
  .marvel-device.iphone16 .dynamic-island {
    width: 126px;
    height: 37px;
    background: #000;
    border-radius: 20px;
    position: absolute;
    top: 14px;
    left: 50%;
    margin-left: -63px;
    z-index: 4;
  }
  /* Power button (right) */
  .marvel-device.iphone16 .sleep {
    position: absolute;
    top: 200px; right: -4px;
    width: 4px; height: 80px;
    border-radius: 0 2px 2px 0;
    background: #2a2a2c;
  }
  /* Volume buttons (left) */
  .marvel-device.iphone16 .volume {
    position: absolute;
    left: -4px; top: 200px;
    width: 4px; height: 55px;
    border-radius: 2px 0 0 2px;
    background: #2a2a2c;
  }
  .marvel-device.iphone16 .volume:before {
    position: absolute;
    left: 0; top: 70px;
    height: 55px; width: 4px;
    border-radius: 2px 0 0 2px;
    background: inherit;
    content: ''; display: block;
  }
  /* Action button (left, above volume) */
  .marvel-device.iphone16 .action {
    position: absolute;
    left: -4px; top: 145px;
    width: 4px; height: 32px;
    border-radius: 2px 0 0 2px;
    background: #2a2a2c;
  }

  /* ── iPhone 16 white variant ── */
  .marvel-device.iphone16.white {
    background: #e8e8ed;
    box-shadow:
      inset 0 0 3px 0 rgba(0,0,0,0.15),
      0 24px 60px rgba(0,0,0,0.22),
      0  6px 18px rgba(0,0,0,0.14);
  }
  .marvel-device.iphone16.white:before { background: #f5f5f7; }
  .marvel-device.iphone16.white:after {
    box-shadow: inset 0 0 3px 0 rgba(0,0,0,0.05), inset 0 0 6px 3px #fff;
  }
  .marvel-device.iphone16.white .sleep,
  .marvel-device.iphone16.white .volume,
  .marvel-device.iphone16.white .action { background: #c8c8cc; }
  .marvel-device.iphone16.white .screen { box-shadow: 0 0 0 2px #bfbfc0; }
`;

export default function PhoneMockup({
  mediaUrl,
  isVideo,
  bgUrl,
  phoneColor = "black",
  phoneModel = "iphone8",
  palette = 1,
}: PhoneMockupProps) {
  const gradient = PALETTE_GRADIENTS[palette] ?? PALETTE_GRADIENTS[1];
  const is16 = phoneModel === "iphone16";

  // iphone8: "black" class for dark variant; iphone16: no class = dark, "white" for light
  const colorClass = is16
    ? (phoneColor === "white" ? "white" : "")
    : (phoneColor === "black" ? "black" : "");

  const mediaContent = (
    <div className="screen">
      {isVideo ? (
        <video
          src={mediaUrl}
          autoPlay muted loop playsInline
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <img
          src={mediaUrl}
          alt=""
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
      )}
    </div>
  );

  return (
    <div className="px-6 md:px-12 lg:px-24 py-32">
      <style dangerouslySetInnerHTML={{ __html: DEVICE_CSS }} />

      {/* aspect-[12/5] = 1920:800 — bg shows fully without crop, scales with container width */}
      <div className="max-w-6xl mx-auto relative aspect-[12/5]">

        {/* Background — fills the aspect-ratio box exactly */}
        {bgUrl ? (
          <img
            src={bgUrl}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
        )}

        {/* Phone — centered, bleeds above and below the bg box */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ zIndex: 1 }}
        >
          {is16 ? (
            <div className={`ph-wrap iphone16-model`}>
              <div className={`ph-scaler iphone16-model`}>
                <div className={`marvel-device iphone16${colorClass ? ` ${colorClass}` : ""}`}>
                  <div className="dynamic-island" />
                  <div className="sleep" />
                  <div className="volume" />
                  <div className="action" />
                  {mediaContent}
                </div>
              </div>
            </div>
          ) : (
            <div className="ph-wrap">
              <div className="ph-scaler">
                <div className={`marvel-device iphone8${colorClass ? ` ${colorClass}` : ""}`}>
                  <div className="top-bar" />
                  <div className="sleep" />
                  <div className="volume" />
                  <div className="camera" />
                  <div className="sensor" />
                  <div className="speaker" />
                  {mediaContent}
                  <div className="home" />
                  <div className="bottom-bar" />
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
