import { Global } from "@emotion/react";
const Fonts = () => (
	<Global
		styles={`
        @font-face {
            font-family: 'Inter';
            src: url('/fonts/Inter.woff2') format('woff2');
            font-weight: 100 900;
            font-display: optional;
            font-style: normal;
        }
        @font-face {
            font-family: 'Kissinger JP';
            font-style: normal;
            font-weight: 400;
            src: url('/fonts/KissingerJp.woff2') format('woff2'), url('/fonts/KissingerJp.ttf') format('ttf');
        }
        `}
	/>
);
export default Fonts;
