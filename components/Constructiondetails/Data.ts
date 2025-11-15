export interface SvgItem {
  id: string;
  svg: string;
  topPercent: number;   // top theo %
  leftPercent: number;  // left theo %
 
}

export const pathsData: SvgItem[] = [
 
  {
    id: "svg_2",
    svg: `
  
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="950" height="740" viewBox="0 0 2048.25 1603.333">
  <rect id="LỘ GIỚI 21M" data-name="LỘ GIỚI 21M" width="46.184" height="1101.55" rx="15" transform="matrix(-0.438, 0.899, -0.899, -0.438, 2041.193, 483.222)" fill="rgba(42,177,182,0.6)" stroke="#fff" stroke-width="0.5"/>
  <rect id="ĐƯỜNG N1" data-name="ĐƯỜNG N1" width="46.184" height="257.217" rx="15" transform="matrix(-0.438, 0.899, -0.899, -0.438, 1811.542, 468.82)" fill="rgba(42,177,182,0.6)" stroke="#fff" stroke-width="0.5"/>
  <rect id="ĐƯỜNG N2" data-name="ĐƯỜNG N2" width="46.184" height="215.503" rx="15" transform="matrix(-0.438, 0.899, -0.899, -0.438, 1774.295, 761.824)" fill="rgba(42,177,182,0.6)" stroke="#fff" stroke-width="0.5"/>
  <rect id="ĐƯỜNG N3" data-name="ĐƯỜNG N3" width="46.184" height="382.012" rx="15" transform="matrix(-0.438, 0.899, -0.899, -0.438, 1738.939, 913.493)" fill="rgba(42,177,182,0.6)" stroke="#fff" stroke-width="0.5"/>
  <rect id="ĐƯỜNG N4" data-name="ĐƯỜNG N4" width="46.184" height="382.012" rx="15" transform="matrix(-0.438, 0.899, -0.899, -0.438, 1774.295, 1101.634)" fill="rgba(42,177,182,0.6)" stroke="#fff" stroke-width="0.5"/>
  <rect id="ĐƯỜNG N5" data-name="ĐƯỜNG N5" width="46.184" height="99.063" rx="15" transform="matrix(-0.848, 0.53, -0.53, -0.848, 1643.687, 1255.944)" fill="rgba(42,177,182,0.6)" stroke="#fff" stroke-width="0.5"/>
  <rect id="ĐƯỜNG N6" data-name="ĐƯỜNG N6" width="46.184" height="99.063" rx="15" transform="matrix(-0.966, 0.259, -0.259, -0.966, 1461.298, 1345.043)" fill="rgba(42,177,182,0.6)" stroke="#fff" stroke-width="0.5"/>
  <rect id="ĐƯỜNG N7" data-name="ĐƯỜNG N7" width="46.184" height="717.941" rx="15" transform="translate(1140.799 978.138) rotate(114)" fill="rgba(42,177,182,0.6)" stroke="#fff" stroke-width="0.5"/>
  <path id="ĐƯỜNG N8" data-name="ĐƯỜNG N8" d="M-34.1,187.9c48.591,85.5,72.189,351.2,77.242,557.609,4.878,199.249-7.954,340.931-7.954,340.931,0,8.284-11.9,8.986-20.183,8.986,0,0-12.663-.48-18.3-6.674s-4.25-9.814-4.25-18.1c0,0,87.963-722.316-136.25-956.072C-201.874,54.04-302.19-1.575-386.54-8.506c-110.238-9.058-233.13,44.838-326.453,81.448-81.814,32.1-142.582,56.116-169.4,66.732-9.343,3.7-5.287,3.237-14.466,5.733s-10.227-3.894-12.966-10.452-3.478-12.984,2.011-15.782,67.79-38.086,140.071-59.443C-653.22,25.893-536.528-47.612-404.7-49.285-276.836-50.908-129.568,19.915-34.1,187.9Z" transform="translate(1517.58 1370.675) rotate(114)" fill="rgba(42,177,182,0.6)" stroke="#fff" stroke-width="0.5"/>
  <rect id="ĐƯỜNG D3" data-name="ĐƯỜNG D3" width="46.184" height="243.063" rx="15" transform="translate(1020.068 1240.49) rotate(-155)" fill="rgba(42,177,182,0.6)" stroke="#fff" stroke-width="0.5"/>
  <rect id="ĐƯỜNG D4" data-name="ĐƯỜNG D4" width="46.184" height="174.69" rx="15" transform="translate(916.498 1120.585) rotate(-155)" fill="rgba(42,177,182,0.6)" stroke="#fff" stroke-width="0.5"/>
  <rect id="ĐƯỜNG D5" data-name="ĐƯỜNG D5" width="46.184" height="174.69" rx="15" transform="translate(787.486 1056.585) rotate(-155)" fill="rgba(42,177,182,0.6)" stroke="#fff" stroke-width="0.5"/>
  <rect id="ĐƯỜNG D6" data-name="ĐƯỜNG D6" width="46.184" height="174.69" rx="15" transform="translate(664.486 1000.681) rotate(-155)" fill="rgba(42,177,182,0.6)" stroke="#fff" stroke-width="0.5"/>
  <rect id="ĐƯỜNG D7" data-name="ĐƯỜNG D7" width="46.184" height="174.69" rx="15" transform="translate(535.473 949.681) rotate(-155)" fill="rgba(42,177,182,0.6)" stroke="#fff" stroke-width="0.5"/>
  <rect id="ĐƯỜNG D8" data-name="ĐƯỜNG D8" width="46.184" height="174.69" rx="15" transform="translate(419.789 892.254) rotate(-155)" fill="rgba(42,177,182,0.6)" stroke="#fff" stroke-width="0.5"/>
  <path id="TRƯỜNG MẪU GIÁO" data-name="TRƯỜNG MẪU GIÁO" d="M6057.463,4915.759l.846-2.469q-1.505-.527-2.97-1.162a44.678,44.678,0,0,1,31.923-83.37l3.893-11.365a2.886,2.886,0,0,1,4.731-1.143l1.859,1.788a2.227,2.227,0,0,0,1.967.513,31.942,31.942,0,1,1,17.928,56.016,44.682,44.682,0,0,1-2,10.189l.493.215.025.008a1.422,1.422,0,0,1,.851,1.821,52.732,52.732,0,0,1-3.991,8.561c-.021.033-.042.068-.065.1a1.988,1.988,0,0,1-2.757.557,44.726,44.726,0,0,1-11.032,11.392c.077.088.147.18.215.274a5.685,5.685,0,0,1,1.07,3.3,4.558,4.558,0,0,1-.267,1.541,3.643,3.643,0,0,1-.8,1.283,2.675,2.675,0,0,1-1.1.688,2.7,2.7,0,0,1-1.293.089,3.651,3.651,0,0,1-1.176-.432l-5,2.248a5.726,5.726,0,0,1-3.561,6.449l-18.836,7.267a5.73,5.73,0,0,1-7.407-3.284l-3.509-9.1A2.882,2.882,0,0,1,6057.463,4915.759Z" transform="translate(-4609.666 -3739.471)" fill="rgba(42,182,70,0.6)" stroke="#fff" stroke-width="0.5"/>
  <path id="NHÀ Ở XÃ HỘI 1 - K1" data-name="NHÀ Ở XÃ HỘI 1 - K1" d="M1382.991,4996.038l-152.225-52.024a4.547,4.547,0,0,1-2.833-5.775l9.462-27.687a55.656,55.656,0,0,1,2.221-5.516l8.333-17.883a7.388,7.388,0,0,1,9.083-3.862l42.027,14.361a10.25,10.25,0,0,1,2.914,1.561l15.467,11.847a12.5,12.5,0,0,0,3.559,1.9l32.008,10.946a12.485,12.485,0,0,0,5.148.626l16.887-1.493a10.242,10.242,0,0,1,4.21.51l28,9.568c.094.034.187.071.278.111,2.086.928,28.186-13.022-13.077,60.1a7.128,7.128,0,0,0-6.915,1.759,4.554,4.554,0,0,1-4.543.95Z" transform="translate(-784.86 -3838.113)" fill="rgba(42,79,182,0.6)" stroke="#fff" stroke-width="0.5"/>
  <path id="NHÀ Ở XÃ HỘI 2" data-name="NHÀ Ở XÃ HỘI 2" d="M7319.7,2131.192l-13.426-6.566-83.165,172.326,91.3,44.66Z" transform="translate(-5578.178 -1655.487)" fill="rgba(42,79,182,0.6)" stroke="#fff" stroke-width="0.5"/>
  <path id="HẠ TẦNG KỸ THUẬT" data-name="HẠ TẦNG KỸ THUẬT" d="M7890.015,1619.2l-6.434-.159-31.188,60.622-.371,14.5,36.064.925Z" transform="translate(-6066.837 -1207.186)" fill="rgba(42,177,182,0.6)" stroke="#fff" stroke-width="0.5"/>
  <image id="CV1" width="34.1" height="35.103" transform="translate(335.478 782.856)" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKoAAACvCAYAAABtu0UxAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAIMSURBVHhe7dSxDQIxEEVBTEv0BDVBT9RkcmeIQ7pnzYQ/2Ohpx5zzAmd3XQc4I6GSIFQShEqCUEkQKglCJUGoJAiVBKGSIFQShEqCUEkQKglCJUGoJAiVBKGSIFQShEqCUEkQKglCJUGoJAiVBKGSIFQShEqCUEkQKglCJUGoJAiVBKGSIFQShEqCUEkQKglCJUGoJAiVBKGSIFQShEqCUEkQKglCJUGoJAiVBKGSIFQShEqCUEkQKglCJUGoJAiVBKGSIFQShEqCUEkQKglCJUGoJAiVBKGSIFQShEqCUEkQKglCJUGoJAiVBKGSIFQShEqCUEkQKglCJUGoJAiVBKGSIFQShEqCUEkQKglCJUGoJAiVBKGSIFQShEqCUEkQKglCJUGoJAiVBKGSIFQShEqCUEkQKglCJUGoJAiVBKGSIFQShEqCUEkQKglCJUGoJAiVBKGSIFQShEqCUEkQKglCJUGoJAiVBKGSIFQSxpxz3b72fj1+P3KA2/051o09bPNRRbq3Qz4q/Ns2H5W9CZUEoZIgVBKESoJQSRAqCUIlQagkCJUEoZIgVBKESoJQSRAqCUIlQagkCJUEoZIgVBKESoJQSRAqCUIlQagkCJUEoZIgVBKESoJQSRAqCUIlQagkCJUEoZIgVBKESoJQSRAqCUIlQagkCJUEoZIgVBKESoJQSRAqCUIl4QM4sA+G1kHAgwAAAABJRU5ErkJggg=="/>
  <image id="BT1" width="34.1" height="35.103" transform="translate(397.865 648.859)" opacity="0.1" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKoAAACvCAYAAABtu0UxAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHpSURBVHhe7dKxDQAgDMAw4P+fy84FRLLHzNkzs+B35w3wI6OSYFQSjEqCUUkwKglGJcGoJBiVBKOSYFQSjEqCUUkwKglGJcGoJBiVBKOSYFQSjEqCUUkwKglGJcGoJBiVBKOSYFQSjEqCUUkwKglGJcGoJBiVBKOSYFQSjEqCUUkwKglGJcGoJBiVBKOSYFQSjEqCUUkwKglGJcGoJBiVBKOSYFQSjEqCUUkwKglGJcGoJBiVBKOSYFQSjEqCUUkwKglGJcGoJBiVBKOSYFQSjEqCUUkwKglGJcGoJBiVBKOSYFQSjEqCUUkwKglGJcGoJBiVBKOSYFQSjEqCUUkwKglGJcGoJBiVBKOSYFQSjEqCUUkwKglGJcGoJBiVBKOSYFQSjEqCUUkwKglGJcGoJBiVBKOSYFQSjEqCUUkwKglGJcGoJBiVBKOSYFQSjEqCUUkwKglGJcGoJBiVBKOSYFQSjEqCUUkwKglGJcGoJBiVBKOSYFQSjEqCUUkwKglGJcGoJBiVBKOSYFQSjEqCUUkwKglGJcGoJBiVBKOSYFQSjEqCUUkwKglGJcGoJBiVBKOSYFQSjEqCUUkwKglGJcGoJBiVBKOSYFQSjEqCUUkwKglGJcGoJBiVBKOSYFQSjEqCUUkwKgkXi4IEW5Y7gbIAAAAASUVORK5CYII="/>
  <g id="Group_542" data-name="Group 542" transform="translate(343.945 612.018)">
    <path id="BT1.3" d="M904.944,2907.549l-12.011,25.768,13.529,6.306,1.2-2.577,18.63,8.683,3.591-7.7,2.242,1.045,2.414-5.18,3.427,1.6,4.8-10.307Z" transform="translate(-830.478 -2828.512)" fill="rgba(117,42,182,0.6)" stroke="#fff" stroke-width="0.5"/>
    <path id="BT1.4" d="M821.083,3087.473l12.011-25.768,13.528,6.306-1.2,2.576,18.631,8.684-3.591,7.706,2.242,1.044-2.414,5.179,3.427,1.6-4.8,10.307Z" transform="translate(-773.038 -2951.746)" fill="rgba(117,42,182,0.6)" stroke="#fff" stroke-width="0.5"/>
    <path id="BT1.5" d="M749.267,3241.555l-12.01,25.768,13.528,6.306,1.2-2.577,18.631,8.683,3.591-7.7,2.242,1.044,2.414-5.179,3.427,1.6,4.8-10.308Z" transform="translate(-706.027 -3095.519)" fill="rgba(117,42,182,0.6)" stroke="#fff" stroke-width="0.5"/>
    <path id="BT1.6" d="M665.406,3421.479l12.01-25.768,13.528,6.305-1.2,2.577,18.63,8.683-3.591,7.7,2.242,1.046-2.414,5.18,3.427,1.6-4.8,10.307Z" transform="translate(-648.59 -3218.754)" fill="rgba(117,42,182,0.6)" stroke="#fff" stroke-width="0.5"/>
    <path id="BT1.7" d="M593.59,3575.56l-12.01,25.769,13.528,6.306,1.2-2.576,18.631,8.683,3.591-7.7,2.242,1.044,2.414-5.179,3.427,1.6,4.8-10.308Z" transform="translate(-581.579 -3362.527)" fill="rgba(117,42,182,0.6)" stroke="#fff" stroke-width="0.5"/>
    <path id="BT1.2" d="M976.76,2753.468l12.01-25.768L1002.3,2734l-1.2,2.577,18.631,8.684-3.591,7.705,2.242,1.044-2.414,5.179,3.427,1.6-4.8,10.306Z" transform="translate(-897.489 -2684.739)" fill="rgba(117,42,182,0.6)" stroke="#fff" stroke-width="0.5"/>
    <path id="BT4.7" d="M7643.176,5127.445l-12.246,25.213,18.543,9.007,1.241-2.558,13.373,6.5,6.226-12.811-2.559-1.243,4.781-9.844Z" transform="translate(-6236.557 -4599.145)" fill="rgba(117,42,182,0.6)" stroke="#fff" stroke-width="0.5"/>
    <path id="BT4.1" d="M7166.984,5615.379l-1.327-1.917,6.943-4.8,1.326,1.916,14.285-9.886-16.067-23.213-13.792,9.544-.647-.935-7.936,5.493,1.48,2.139-11.561,8,15.233,22.012Z" transform="translate(-5843.852 -4958.902)" fill="rgba(117,42,182,0.6)" stroke="#fff" stroke-width="0.5"/>
    <path id="BT3.7" d="M6865.518,5822.43l1.325,1.916,12.064-8.348-15.259-22.043-11.57,8.008-1.456-2.105-7.926,5.485.646.936-13.791,9.547,16.065,23.213,14.282-9.886-1.327-1.916Z" transform="translate(-5594.05 -5137.417)" fill="rgba(117,42,182,0.6)" stroke="#fff" stroke-width="0.5"/>
    <path id="BT3.1" d="M6261.89,6190.813l-.537-2.268,8.216-1.947.538,2.268,16.9-4-6.507-27.47-16.323,3.868-.262-1.109-9.378,2.222.589,2.491-13.692,3.244,6.181,26.086Z" transform="translate(-5123.903 -5427.952)" fill="rgba(117,42,182,0.6)" stroke="#fff" stroke-width="0.5"/>
    <path id="BT2.6" d="M5907.569,6271.375l.515,2.178,14.274-3.382-6.175-26.06-13.692,3.242-.587-2.479-9.378,2.222.261,1.105-16.322,3.869,6.247,26.363,16.9-4-.262-1.108Z" transform="translate(-4832.145 -5497.279)" fill="rgba(117,42,182,0.6)" stroke="#fff" stroke-width="0.5"/>
    <path id="BT2.5" d="M5826.908,6018.172l-1.109.251-1.386.312-3.09-13.729-25.046,5.638,3.221,14.31,2.219-.5,1.854,8.239-2.217.5,3.6,16,26.433-5.951-3.471-15.42,1.108-.251Z" transform="translate(-4768.038 -5306.137)" fill="rgba(117,42,182,0.6)" stroke="#fff" stroke-width="0.5"/>
    <path id="BT3.2" d="M6262.031,5923.665l1.11-.25,1.386-.312-3.091-13.729,25.046-5.638,3.222,14.31-2.22.5,1.855,8.239,2.219-.5,3.6,16-26.432,5.952-3.471-15.421-1.111.249Z" transform="translate(-5139.892 -5225.18)" fill="rgba(117,42,182,0.6)" stroke="#fff" stroke-width="0.5"/>
    <path id="BT2.1" d="M5249.524,6056.043l2.1,1.018,6.41-13.194-25.394-12.334-6.147,12.656-.768-.371-4.211,8.669.767.373-7.327,15.087,25.392,12.335,7.591-15.625-2.1-1.019Z" transform="translate(-4303.321 -5327.342)" fill="rgba(117,42,182,0.6)" stroke="#fff" stroke-width="0.5"/>
    <path id="BT3.4" d="M6383.038,5591.9l22.81-9.748,1.267,2.968,13.15-5.62-8.045-18.823-2.09.894-6.665-15.595-18.338,7.84.894,2.092-12.954,5.535,5.77,13.5-2.574,1.1Z" transform="translate(-5229.13 -4939.175)" fill="rgba(117,42,182,0.6)" stroke="#fff" stroke-width="0.5"/>
    <path id="BT4.4" d="M7120.608,5101.417l17.851-17.226,2.241,2.323,10.291-9.929-14.215-14.731-1.637,1.579-11.8-12.233-14.342,13.838,1.581,1.637-10.148,9.792,10.225,10.6-2.014,1.944Z" transform="translate(-5812.467 -4538.193)" fill="rgba(117,42,182,0.6)" stroke="#fff" stroke-width="0.5"/>
    <path id="BT3.3" d="M6175.969,5651.9l-3.745.84,1.687,7.5-4.991,1.125,3.766,16.724,33.365-7.511-3.766-16.726-1.941.438-3.859-17.141-11.123,2.5.613,2.717-11.567,2.605Z" transform="translate(-5065.935 -5012.066)" fill="rgba(117,42,182,0.6)" stroke="#fff" stroke-width="0.5"/>
    <path id="BT2.2" d="M5325.858,5795.219l-2.841-.116-.417,10.17,33.6,1.377.7-17.128-1.99-.082.707-17.186-11.392-.466-.1,2.414-10.792-.443-.291,7.1-3.083-.127-.315,7.668-3.508-.144Z" transform="translate(-4389.375 -5119.697)" fill="rgba(117,42,182,0.6)" stroke="#fff" stroke-width="0.5"/>
    <path id="BT4.3" d="M6966.509,5241.179l-4.145,2.753,4.216,6.348,2.132-1.417,5.271,7.935,25.762-17.115-9.485-14.279-1.656,1.1-9.045-13.618-9.5,6.309.864,1.3-9,5.978,3.933,5.92-3.6,2.392Z" transform="translate(-5701.75 -4667.447)" fill="rgba(117,42,182,0.6)" stroke="#fff" stroke-width="0.5"/>
    <path id="BT3.5" d="M6595.176,5492.633l-2.132,1.416,9.486,14.278,25.411-16.878-5.271-7.931,2.606-1.731-4.215-6.347-2.606,1.73-4.248-6.394-5.21,3.46-3.931-5.919-8.574,5.693-.809-1.219-9.5,6.309Z" transform="translate(-5399.5 -4877.098)" fill="rgba(117,42,182,0.6)" stroke="#fff" stroke-width="0.5"/>
    <path id="BT2.3" d="M5543.958,5792.11l21.872-.959.165,3.792,14.288-.627-.923-21.018-2.271.1-.748-17.042-19.968.877.1,2.33-11.076.485.644,14.713-2.839.125Z" transform="translate(-4565.73 -5107.359)" fill="rgba(117,42,182,0.6)" stroke="#fff" stroke-width="0.5"/>
    <path id="BT4.5" d="M7255.5,4947.036l23.291,21.754,6.735-7.209-1.247-1.165,4.658-4.985-3.388-3.164,9.508-10.181-7.892-7.375-1.234,1.32-4.549-4.25-3.232,3.458-3.1-2.891-5.044,5.4-3.119-2.91Z" transform="translate(-5936.436 -4442.729)" fill="rgba(117,42,182,0.6)" stroke="#fff" stroke-width="0.5"/>
    <path id="BT3.6" d="M6708.42,5642.807l-22.9,15.768,11.042,16.04L6698.9,5673l8.432,12.248,11.732-8.078-1.613-2.341,8.243-5.675-12.042-17.493.583-.4Z" transform="translate(-5478.91 -5016.588)" fill="rgba(117,42,182,0.6)" stroke="#fff" stroke-width="0.5"/>
    <path id="BT4.6" d="M7468.092,5028.327l-1.49,3.069-7.7-3.74.31-.64-8.975-4.359-12.148,25.009,17.261,8.385,1.24-2.551,11.823,5.743,6.227-12.818-1.519-.737,5.863-12.07Z" transform="translate(-6082.399 -4515.378)" fill="rgba(117,42,182,0.6)" stroke="#fff" stroke-width="0.5"/>
    <path id="BT4.2" d="M7109.807,5403.326l2.342-1.622-11.082-16.012-22.868,15.825,5.84,8.439.585-.4,4.869,7.036-1.4.971,6.894,9.959,9.631-6.667.971,1.4,11.712-8.105Z" transform="translate(-5794.699 -4805.591)" fill="rgba(117,42,182,0.6)" stroke="#fff" stroke-width="0.5"/>
    <path id="BT2.4" d="M5777.01,5763.295l-2.691.605,3.764,16.724,31.065-6.992-3.764-16.725-4.438,1-1.685-7.487-3.191.719-1.561-6.935-9.624,2.165-.531-2.357-11.124,2.5Z" transform="translate(-4749.613 -5097.491)" fill="rgba(117,42,182,0.6)" stroke="#fff" stroke-width="0.5"/>
    <path id="BT1.1" d="M.594,19.929l1.11-.251,1.387-.311L0,5.638,25.046,0l3.222,14.309-2.22.5L27.9,23.046l2.219-.5,3.6,16L7.293,44.5,3.822,29.08l-1.11.25Z" transform="translate(94.322 26.577) rotate(-52)" fill="rgba(117,42,182,0.6)" stroke="#fff" stroke-width="0.5"/>
  </g>
  <g id="Group_541" data-name="Group 541" transform="translate(1319.985 430.044)">
    <rect id="LK4.2" width="14.215" height="41.693" transform="translate(101.425 561.456) rotate(-64.092)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <path id="LK4.1" d="M6082.005,4284.984l-3.743,1.3-5.607,11.546,37.5,18.217,6.832-14.066Z" transform="translate(-5965.02 -3749.156)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK4.3" width="14.215" height="41.693" transform="translate(95.214 574.241) rotate(-64.093)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK4.4" width="14.215" height="41.693" transform="translate(89.003 587.029) rotate(-64.092)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK4.5" width="14.215" height="41.693" transform="translate(82.792 599.815) rotate(-64.093)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK4.6" width="14.215" height="41.693" transform="translate(76.582 612.6) rotate(-64.093)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK4.7" width="14.215" height="41.693" transform="translate(70.371 625.388) rotate(-64.093)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK4.8" width="14.215" height="41.693" transform="translate(64.16 638.174) rotate(-64.092)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK4.9" width="14.215" height="41.693" transform="translate(57.95 650.962) rotate(-64.093)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK4.10" width="14.215" height="41.693" transform="translate(51.739 663.747) rotate(-64.093)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK4.11" width="14.215" height="41.693" transform="translate(45.528 676.533) rotate(-64.093)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK4.12" width="14.215" height="41.693" transform="translate(39.318 689.321) rotate(-64.093)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK4.13" width="14.215" height="41.693" transform="translate(33.107 702.106) rotate(-64.093)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK4.14" width="14.215" height="41.693" transform="translate(26.896 714.891) rotate(-64.093)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK4.15" width="14.215" height="41.693" transform="translate(20.685 727.68) rotate(-64.093)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK4.16" width="14.215" height="41.693" transform="translate(14.475 740.465) rotate(-64.093)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK4.17" width="14.215" height="41.693" transform="translate(8.264 753.253) rotate(-64.093)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <path id="LK4.18" d="M5581.817,5387.127l-37.5-18.218-8.265,17.017,3.219,6.292,19.385,9.416,3.726-7.671,13.042,6.334Z" transform="translate(-5536.05 -4615.658)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK4.19" width="42.645" height="14.485" transform="translate(133.987 597.815) rotate(-64.093)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK4.20" width="42.645" height="14.215" transform="translate(147.016 604.144) rotate(-64.092)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK4.21" width="42.645" height="14.215" transform="translate(159.802 610.354) rotate(-64.093)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK4.22" width="42.645" height="14.215" transform="translate(172.59 616.568) rotate(-64.092)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK4.23" width="42.645" height="14.215" transform="translate(185.375 622.779) rotate(-64.092)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK4.24" width="42.645" height="14.215" transform="translate(198.161 628.989) rotate(-64.092)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK4.25" width="42.645" height="14.215" transform="translate(210.949 635.2) rotate(-64.092)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK4.26" width="42.645" height="14.215" transform="translate(223.734 641.411) rotate(-64.092)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK4.27" width="42.645" height="14.215" transform="translate(236.52 647.621) rotate(-64.092)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK4.28" width="42.645" height="14.215" transform="translate(249.308 653.832) rotate(-64.093)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK4.29" width="42.645" height="14.215" transform="translate(262.093 660.043) rotate(-64.092)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <path id="LK4.30" d="M6941.84,4758.522l-1.043-6.914-15.747-7.649-18.633,38.36,13.17,6.4,6.733-13.861,6.138,2.981Z" transform="translate(-6631.537 -4116.066)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <path id="LK3.33" d="M7199.726,4377.435l-13.17-6.4-18.235,37.542,16.5,8.011,8.109-2.378,9.415-19.387-8.95-4.348Z" transform="translate(-6840.905 -3817.948)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <path id="LK3.20" d="M7313.45,4166.082l-3.142-7.842-16.5-8.013-18.234,37.541,13.169,6.4,6.335-13.042,8.95,4.349Z" transform="translate(-6926.646 -3641.428)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK3.19" width="41.736" height="14.215" transform="translate(336.143 540.127) rotate(-64.093)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK3.32" width="41.736" height="14.215" transform="matrix(0.437, -0.9, 0.9, 0.437, 314.629, 584.42)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK3.31" width="41.736" height="14.215" transform="translate(301.841 578.209) rotate(-64.092)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK3.18" width="41.736" height="14.215" transform="matrix(0.437, -0.9, 0.9, 0.437, 323.357, 533.917)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK3.17" width="41.736" height="14.215" transform="translate(310.569 527.706) rotate(-64.093)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK3.30" width="41.736" height="14.215" transform="translate(289.056 571.998) rotate(-64.092)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK3.29" width="41.736" height="14.215" transform="translate(276.27 565.788) rotate(-64.092)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK3.16" width="41.736" height="14.215" transform="matrix(0.437, -0.9, 0.9, 0.437, 297.784, 521.495)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK3.15" width="41.735" height="14.215" transform="translate(284.998 515.285) rotate(-64.093)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK3.28" width="41.736" height="14.215" transform="translate(263.482 559.577) rotate(-64.093)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK3.27" width="41.736" height="14.215" transform="translate(250.697 553.366) rotate(-64.093)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK3.14" width="41.735" height="14.215" transform="matrix(0.437, -0.9, 0.9, 0.437, 272.21, 509.074)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK3.13" width="41.735" height="14.215" transform="translate(259.425 502.863) rotate(-64.093)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK3.26" width="41.736" height="14.215" transform="translate(237.911 547.156) rotate(-64.092)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK3.25" width="41.735" height="14.215" transform="translate(225.123 540.945) rotate(-64.092)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK3.12" width="41.735" height="14.215" transform="translate(246.639 496.653) rotate(-64.093)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK3.11" width="41.735" height="14.215" transform="matrix(0.437, -0.9, 0.9, 0.437, 233.851, 490.442)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK3.24" width="41.735" height="14.215" transform="translate(212.338 534.734) rotate(-64.092)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK3.23" width="41.735" height="14.215" transform="translate(199.552 528.524) rotate(-64.092)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK3.10" width="41.735" height="14.215" transform="translate(221.066 484.231) rotate(-64.093)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK3.9" width="41.735" height="14.215" transform="matrix(0.437, -0.9, 0.9, 0.437, 208.28, 478.021)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK3.22" width="41.735" height="14.215" transform="translate(186.764 522.313) rotate(-64.092)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK3.21" width="41.735" height="13.917" transform="translate(174.248 516.231) rotate(-64.093)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK3.8" width="41.735" height="13.917" transform="translate(195.761 471.939) rotate(-64.093)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <path id="LK3.1" d="M6385.286,3660.291l-3.8,1.315-5.59,11.508,37.541,18.235,6.832-14.065Z" transform="translate(-6207.434 -3249.768)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK3.2" width="14.215" height="41.735" transform="translate(162.252 436.131) rotate(-64.093)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK3.3" width="14.215" height="41.735" transform="translate(156.041 448.916) rotate(-64.093)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK3.4" width="14.215" height="41.735" transform="translate(149.83 461.704) rotate(-64.093)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK3.5" width="14.215" height="41.735" transform="matrix(0.437, -0.9, 0.9, 0.437, 143.62, 474.49)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK3.6" width="14.215" height="41.735" transform="translate(137.409 487.278) rotate(-64.093)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <path id="LK3.7" d="M6236.351,4061.172l-37.544-18.234-5.588,11.508,1.316,3.8,34.982,16.992Z" transform="translate(-6061.4 -3555.66)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <path id="LK5.25" d="M7751.653,4196.528l-39.543-9.995-5.65,16.5,39.854,12.434Z" transform="translate(-7271.101 -3670.454)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <path id="LK5.26" d="M7723.8,4281.206l-39.854-12.436-5.649,16.5,39.11,14.607Z" transform="translate(-7248.583 -3736.193)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <path id="LK5.27" d="M7691.4,4365.616l-39.11-14.606-6.525,16.111,38.25,16.729Z" transform="translate(-7222.573 -3801.936)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <path id="LK5.28" d="M7650.9,4448.064l-38.25-16.727-8.31,17.538,37.557,18.243Z" transform="translate(-7189.461 -3866.154)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <path id="LK5.29" d="M7612.192,4537.012l-37.558-18.241-7.452,15.344,37.721,18.322Z" transform="translate(-7159.758 -3936.045)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <path id="LK5.30" d="M7575.2,4613.587l-37.721-18.322-7.453,15.345,37.886,18.4Z" transform="translate(-7130.056 -3997.198)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <path id="LK5.31" d="M7551.742,4690.159l-37.885-18.4-4.058,8.354,2.418,8.865,32.6,15.835Z" transform="translate(-7113.889 -4058.346)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK5.17" width="17.072" height="41.735" transform="matrix(0.025, -1, 1, 0.025, 453.479, 368.18)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK5.18" width="17.058" height="41.735" transform="matrix(0.025, -1, 1, 0.025, 453.048, 385.232)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK5.19" width="17.058" height="41.735" transform="matrix(0.025, -1, 1, 0.025, 452.614, 402.285)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK5.20" width="17.058" height="41.735" transform="matrix(0.025, -1, 1, 0.025, 452.18, 419.338)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <path id="LK5.21" d="M7818.3,3786.266l-41.724-1.06-.437,17.171,41.7,1.927Z" transform="translate(-7324.393 -3365.869)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <path id="LK5.22" d="M7811.022,3872.736l-41.7-1.928-1.709,17.306,41.833,4.243Z" transform="translate(-7317.582 -3434.299)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <path id="LK5.23" d="M7802.6,3961.326l-41.837-4.242-1.717,17.388,41.965,6.608Z" transform="translate(-7310.732 -3503.272)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <path id="LK5.24" d="M7788.361,4050.377l-41.965-6.607-3.176,17.093,41.541,8.9Z" transform="translate(-7298.08 -3572.567)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK2.18" width="41.735" height="13.917" transform="translate(235.111 390.926) rotate(-64.092)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK2.8" width="42.105" height="13.917" transform="translate(256.445 347.003) rotate(-64.093)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK2.9" width="42.105" height="14.215" transform="translate(268.965 353.085) rotate(-64.092)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK2.19" width="41.735" height="14.215" transform="translate(247.631 397.005) rotate(-64.092)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK2.20" width="41.735" height="14.215" transform="translate(260.416 403.215) rotate(-64.092)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK2.10" width="42.105" height="14.215" transform="translate(281.75 359.295) rotate(-64.092)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK2.11" width="42.105" height="14.215" transform="translate(294.538 365.506) rotate(-64.093)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK2.21" width="41.735" height="14.215" transform="translate(273.204 409.426) rotate(-64.092)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK2.22" width="41.735" height="14.215" transform="matrix(0.437, -0.9, 0.9, 0.437, 285.99, 415.637)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK2.12" width="42.105" height="14.215" transform="translate(307.324 371.717) rotate(-64.092)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK2.13" width="42.105" height="14.215" transform="translate(320.109 377.927) rotate(-64.092)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK2.23" width="41.735" height="14.215" transform="translate(298.775 421.847) rotate(-64.092)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK2.24" width="41.735" height="14.215" transform="translate(311.563 428.061) rotate(-64.092)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK2.14" width="42.105" height="14.215" transform="translate(332.897 384.138) rotate(-64.092)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK2.15" width="42.105" height="14.215" transform="translate(345.683 390.349) rotate(-64.092)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK2.25" width="41.735" height="14.215" transform="translate(324.349 434.271) rotate(-64.093)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK2.26" width="41.735" height="14.215" transform="translate(337.137 440.482) rotate(-64.092)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK2.16" width="42.105" height="14.215" transform="translate(358.468 396.559) rotate(-64.092)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK2.27" width="41.735" height="14.215" transform="translate(349.922 446.693) rotate(-64.092)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK2.28" width="41.735" height="14.215" transform="translate(362.708 452.903) rotate(-64.092)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <path id="LK2.17" d="M7424.237,3444.563l.006-.249-1.955-3.211-17.01-8.263-18.4,37.872,13.17,6.4,6.515-13.413,6.777,3.292Z" transform="translate(-7015.627 -3067.943)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <path id="LK2.29" d="M7439.4,3721.773l-13.157-6.392-18.235,37.541,14.321,6.956,5.081-2.921,9.765-20.1-4.125-2Z" transform="translate(-7032.517 -3293.808)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK2.4" width="14.215" height="41.735" transform="matrix(0.437, -0.9, 0.9, 0.437, 210.697, 336.396)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK2.5" width="14.215" height="41.735" transform="translate(204.486 349.184) rotate(-64.093)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK2.6" width="14.215" height="41.735" transform="matrix(0.437, -0.9, 0.9, 0.437, 198.275, 361.969)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <path id="LK2.7" d="M6502.242,3418.245l-5.59,11.508,1.315,3.8,34.984,16.993,6.832-14.065Z" transform="translate(-6303.966 -3056.276)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <path id="LK2.1" d="M6688.72,3035.6l-3.8,1.316-5.589,11.508,37.541,18.234,6.831-14.065Z" transform="translate(-6450.002 -2750.383)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK2.2" width="14.215" height="41.735" transform="translate(223.118 310.825) rotate(-64.093)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK2.3" width="14.215" height="41.735" transform="matrix(0.437, -0.899, 0.899, 0.437, 216.908, 323.611)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <path id="LK1.25" d="M7426.745,2959.663l-8.951-4.348,6.338-13.042-13.171-6.4-18.234,37.541,16.5,8.013,8.108-2.381Z" transform="translate(-7022.336 -2689.923)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK1.24" width="41.735" height="14.215" transform="translate(357.606 277.283) rotate(-64.092)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK1.23" width="41.735" height="14.215" transform="translate(344.821 271.072) rotate(-64.093)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK1.22" width="41.735" height="14.215" transform="translate(332.032 264.861) rotate(-64.092)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK1.21" width="41.735" height="14.215" transform="translate(319.247 258.651) rotate(-64.092)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK1.20" width="41.735" height="14.215" transform="translate(306.462 252.44) rotate(-64.092)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK1.19" width="41.735" height="13.917" transform="translate(293.942 246.361) rotate(-64.093)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <path id="LK1.1" d="M7332.742,1709.718l-3.8,1.315-5.59,11.507,37.542,18.235,6.831-14.065Z" transform="translate(-6966.875 -1709.719)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK1.2" width="14.215" height="41.735" transform="translate(350.267 25.607) rotate(-64.092)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK1.3" width="14.215" height="41.735" transform="matrix(0.437, -0.9, 0.9, 0.437, 344.056, 38.396)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK1.4" width="14.215" height="41.735" transform="translate(337.845 51.181) rotate(-64.093)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK1.5" width="14.215" height="41.735" transform="translate(331.635 63.966) rotate(-64.093)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK1.6" width="14.215" height="41.735" transform="translate(325.424 76.755) rotate(-64.093)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK1.7" width="14.215" height="41.735" transform="translate(319.213 89.54) rotate(-64.093)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK1.8" width="14.215" height="41.735" transform="translate(313.003 102.325) rotate(-64.092)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK1.9" width="14.215" height="41.735" transform="matrix(0.437, -0.9, 0.9, 0.437, 306.792, 115.113)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK1.10" width="14.215" height="41.735" transform="matrix(0.437, -0.9, 0.9, 0.437, 300.581, 127.899)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK1.11" width="14.215" height="41.735" transform="matrix(0.437, -0.9, 0.9, 0.437, 294.371, 140.687)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK1.12" width="14.215" height="41.735" transform="translate(288.16 153.472) rotate(-64.093)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK1.13" width="14.215" height="41.735" transform="translate(281.949 166.258) rotate(-64.093)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK1.14" width="14.215" height="41.735" transform="matrix(0.437, -0.899, 0.899, 0.437, 275.738, 179.046)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK1.15" width="14.215" height="41.735" transform="translate(269.528 191.831) rotate(-64.093)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK1.16" width="14.215" height="41.735" transform="matrix(0.437, -0.899, 0.899, 0.437, 263.317, 204.617)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK1.17" width="14.215" height="41.735" transform="matrix(0.437, -0.9, 0.9, 0.437, 257.106, 217.405)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <path id="LK1.18" d="M6805.676,2793.551l-5.59,11.508,1.315,3.8,34.982,16.992,6.832-14.065Z" transform="translate(-6548.57 -2576.146)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK5.1" width="17.058" height="41.735" transform="translate(460.77 81.131) rotate(-88.545)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK5.2" width="17.058" height="41.735" transform="translate(460.336 98.183) rotate(-88.545)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK5.3" width="17.058" height="41.735" transform="translate(459.902 115.236) rotate(-88.545)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK5.4" width="17.058" height="41.735" transform="translate(459.471 132.286) rotate(-88.545)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK5.5" width="17.058" height="41.735" transform="matrix(0.025, -1, 1, 0.025, 459.037, 149.339)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK5.6" width="17.058" height="41.735" transform="matrix(0.025, -1, 1, 0.025, 458.606, 166.391)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK5.7" width="17.058" height="41.735" transform="matrix(0.025, -1, 1, 0.025, 458.172, 183.444)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK5.8" width="17.058" height="41.735" transform="matrix(0.025, -1, 1, 0.025, 457.738, 200.497)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK5.9" width="17.058" height="41.735" transform="matrix(0.025, -1, 1, 0.025, 457.307, 217.55)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK5.10" width="17.058" height="41.735" transform="matrix(0.025, -1, 1, 0.025, 456.873, 234.602)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK5.11" width="17.058" height="41.735" transform="matrix(0.025, -1, 1, 0.025, 456.439, 251.655)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK5.12" width="17.058" height="41.735" transform="matrix(0.025, -1, 1, 0.025, 456.007, 268.708)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK5.13" width="17.058" height="41.735" transform="matrix(0.025, -1, 1, 0.025, 455.573, 285.761)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK5.14" width="17.058" height="41.735" transform="matrix(0.025, -1, 1, 0.025, 455.139, 302.811)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK5.15" width="17.058" height="41.735" transform="matrix(0.025, -1, 1, 0.025, 454.708, 319.863)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
    <rect id="LK5.16" width="17.072" height="41.735" transform="matrix(0.025, -1, 1, 0.025, 454.274, 336.93)" fill="rgba(238,75,55,0.6)" stroke="#fff" stroke-width="0.5"/>
  </g>
  <g id="Group_540" data-name="Group 540" transform="translate(404.898 345.405)">
    <rect id="Rectangle 5360" data-name="Rectangle 5360" width="39.887" height="17.058" transform="translate(296.64 768.819) rotate(-71.133)" fill="none" stroke="#090" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.709"/>
    <rect id="Rectangle 5361" data-name="Rectangle 5361" width="39.887" height="17.058" transform="translate(312.783 774.336) rotate(-71.133)" fill="none" stroke="#090" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.709"/>
    <rect id="SH8.2" width="39.887" height="17.058" transform="translate(544.143 853.4) rotate(-71.133)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <path id="SH8.1" d="M3799.726,5295.2l-1.474-3.458-18.1-6.184-12.9,37.743,16.71,5.713Z" transform="translate(-3206.971 -4464.389)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH8.3" width="39.887" height="17.058" transform="translate(528.001 847.884) rotate(-71.133)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH8.4" width="39.887" height="17.058" transform="translate(511.861 842.367) rotate(-71.133)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH8.5" width="39.887" height="17.058" transform="translate(495.718 836.851) rotate(-71.133)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH8.6" width="39.887" height="17.058" transform="matrix(0.323, -0.946, 0.946, 0.323, 479.578, 831.335)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH8.7" width="40.029" height="17.051" transform="matrix(0.323, -0.946, 0.946, 0.323, 452.629, 822.277)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH8.8" width="40.029" height="17.058" transform="translate(436.487 816.76) rotate(-71.133)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH8.9" width="40.029" height="17.058" transform="translate(420.344 811.244) rotate(-71.133)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH8.10" width="40.029" height="17.058" transform="translate(404.204 805.728) rotate(-71.133)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH8.11" width="40.029" height="17.058" transform="translate(388.061 800.212) rotate(-71.133)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH8.12" width="40.029" height="17.058" transform="translate(371.921 794.695) rotate(-71.133)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH8.13" width="40.029" height="17.058" transform="translate(355.779 789.179) rotate(-71.133)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH8.14" width="40.029" height="17.065" transform="matrix(0.323, -0.946, 0.946, 0.323, 339.633, 783.66)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <path id="SH7.1" d="M4511.93,4554.9l-3.817,1.356-6.812,14.025,35.8,17.389,7.091-14.6-1.335-3.758Z" transform="translate(-3793.773 -3880.287)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH7.2" width="17.058" height="39.802" transform="matrix(0.437, -0.9, 0.9, 0.437, 700.072, 705.332)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH7.3" width="17.058" height="39.802" transform="matrix(0.437, -0.9, 0.9, 0.437, 692.62, 720.677)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH7.4" width="17.058" height="39.802" transform="matrix(0.437, -0.9, 0.9, 0.437, 685.167, 736.021)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH7.5" width="17.058" height="39.802" transform="matrix(0.437, -0.9, 0.9, 0.437, 677.713, 751.366)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH7.6" width="17.058" height="39.802" transform="matrix(0.437, -0.9, 0.9, 0.437, 670.261, 766.708)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH7.7" width="17.058" height="39.802" transform="matrix(0.437, -0.9, 0.9, 0.437, 662.807, 782.053)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <path id="SH7.8" d="M4278.067,5107.922l-35.8-17.39-9.059,18.652,1.427,3.423,32.649,11.159,3.874-1.616Z" transform="translate(-3579.456 -4308.481)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH6.7" width="14.485" height="39.887" transform="translate(589.688 729.517) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH6.6" width="14.215" height="39.887" transform="matrix(0.422, -0.906, 0.906, 0.422, 595.806, 716.387)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH6.5" width="14.215" height="39.887" transform="matrix(0.422, -0.906, 0.906, 0.422, 601.812, 703.504)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH6.4" width="14.215" height="39.887" transform="translate(607.818 690.62) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH6.3" width="14.215" height="39.887" transform="translate(613.822 677.734) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH6.2" width="14.215" height="39.887" transform="translate(619.828 664.851) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <path id="SH6.1" d="M4101.844,4358.515l-7.806,16.748,36.153,16.852,6.605-14.172-1.376-3.778Z" transform="translate(-3468.207 -3723.297)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <path id="SH6.21" d="M3907.148,4272.555l-33.576-15.649-3.778,1.375-6.606,14.173,36.153,16.849Z" transform="translate(-3283.662 -3642.069)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH6.20" width="14.215" height="39.887" transform="translate(573.522 643.267) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH6.19" width="14.215" height="39.887" transform="translate(567.516 656.154) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH6.18" width="14.215" height="39.887" transform="translate(561.51 669.037) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH6.17" width="14.215" height="39.887" transform="translate(555.506 681.92) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH6.16" width="14.215" height="39.887" transform="translate(549.5 694.804) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH6.15" width="14.485" height="39.887" transform="translate(543.382 707.933) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <path id="SH6.14" d="M3589.639,4739.748l-14.173-6.606-17.717,38.011,1.473,3.457,12.222,4.176Z" transform="translate(-3039.49 -4022.78)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <path id="SH6.13" d="M3657.1,4772.078l-12.884-6-18.195,39.037,13.528,4.624Z" transform="translate(-3094.064 -4049.104)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <path id="SH6.12" d="M3723.9,4802.017l-12.885-6.006-17.551,37.656,13.529,4.625Z" transform="translate(-3147.978 -4073.037)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <path id="SH6.11" d="M3790.7,4831.955l-12.885-6-16.907,36.275,13.528,4.624Z" transform="translate(-3201.895 -4096.97)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <path id="SH6.10" d="M3857.493,4861.893l-12.886-6-16.262,34.894,13.528,4.623Z" transform="translate(-3255.806 -4120.901)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <path id="SH6.9" d="M3924.292,4891.832l-12.884-6.006-15.619,33.51,13.529,4.623Z" transform="translate(-3309.722 -4144.835)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <path id="SH6.8" d="M3992.379,4922.37l-14.171-6.607-14.976,32.13,12.222,4.175,3.847-1.638Z" transform="translate(-3363.638 -4168.766)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH1.1" width="17.058" height="38.466" transform="translate(747.414 609.831) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH1.2" width="17.058" height="38.466" transform="translate(740.206 625.291) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <path id="SH1.3" d="M4670.374,4325.28l-34.866-16.25-7.205,15.462,32.232,15.021,3.839-1.362Z" transform="translate(-3895.302 -3683.739)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH1.14" width="39.887" height="14.215" transform="translate(588.601 567.174) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH1.13" width="39.887" height="14.215" transform="translate(601.485 573.18) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH1.12" width="39.887" height="14.215" transform="translate(614.368 579.186) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH1.11" width="39.887" height="14.215" transform="translate(627.251 585.19) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH1.10" width="39.887" height="14.215" transform="translate(640.138 591.196) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH1.9" width="39.887" height="14.215" transform="translate(653.021 597.203) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH1.8" width="39.887" height="14.215" transform="translate(665.904 603.206) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH1.7" width="39.887" height="14.215" transform="translate(678.791 609.212) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH1.6" width="39.887" height="14.215" transform="translate(691.674 615.216) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH1.5" width="39.887" height="14.215" transform="translate(704.557 621.222) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH1.4" width="39.887" height="14.485" transform="translate(717.444 627.228) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH1.23" width="39.887" height="14.215" transform="translate(462.335 508.324) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH1.22" width="39.887" height="14.215" transform="translate(475.218 514.33) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH1.21" width="39.887" height="14.215" transform="translate(488.102 520.333) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH1.20" width="39.887" height="14.215" transform="translate(500.988 526.34) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH1.19" width="39.887" height="14.215" transform="translate(513.871 532.346) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH1.18" width="39.887" height="14.215" transform="translate(526.755 538.349) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH1.17" width="39.887" height="14.215" transform="translate(539.641 544.356) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH1.16" width="39.887" height="14.215" transform="translate(552.524 550.359) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH1.15" width="39.887" height="14.215" transform="translate(565.408 556.365) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH1.32" width="39.887" height="14.215" transform="translate(336.068 449.474) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH1.31" width="39.887" height="14.215" transform="translate(348.952 455.477) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH1.30" width="39.887" height="14.215" transform="translate(361.838 461.483) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH1.29" width="39.887" height="14.215" transform="translate(374.721 467.49) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH1.28" width="39.887" height="14.215" transform="translate(387.605 473.493) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH1.27" width="39.887" height="14.215" transform="translate(400.491 479.499) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH1.26" width="39.887" height="14.215" transform="translate(413.374 485.506) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH1.25" width="39.887" height="14.215" transform="translate(426.258 491.509) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH1.24" width="39.887" height="14.213" transform="translate(439.144 497.515) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH1.41" width="39.887" height="14.215" transform="translate(209.802 390.621) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH1.40" width="39.887" height="14.215" transform="translate(222.688 396.627) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH1.39" width="39.887" height="14.215" transform="translate(235.572 402.633) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH1.38" width="39.887" height="14.215" transform="translate(248.455 408.637) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH1.37" width="39.887" height="14.215" transform="translate(261.341 414.643) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH1.36" width="39.887" height="14.215" transform="translate(274.225 420.649) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH1.35" width="39.887" height="14.215" transform="translate(287.108 426.653) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH1.34" width="39.887" height="14.215" transform="translate(299.994 432.659) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH1.33" width="39.887" height="14.215" transform="translate(312.878 438.662) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH1.50" width="39.887" height="14.499" transform="translate(83.281 331.65) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH1.49" width="39.887" height="14.215" transform="matrix(0.422, -0.906, 0.906, 0.422, 96.422, 337.777)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH1.48" width="39.887" height="14.215" transform="matrix(0.422, -0.906, 0.906, 0.422, 109.305, 343.78)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH1.47" width="39.887" height="14.215" transform="matrix(0.422, -0.906, 0.906, 0.422, 122.192, 349.786)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH1.46" width="39.887" height="14.215" transform="matrix(0.422, -0.906, 0.906, 0.422, 135.075, 355.793)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH1.45" width="39.887" height="14.215" transform="matrix(0.422, -0.906, 0.906, 0.422, 147.958, 361.796)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH1.44" width="39.887" height="14.215" transform="matrix(0.422, -0.906, 0.906, 0.422, 160.845, 367.802)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH1.43" width="39.887" height="14.215" transform="matrix(0.422, -0.906, 0.906, 0.422, 173.728, 373.806)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH1.42" width="39.887" height="14.215" transform="matrix(0.422, -0.906, 0.906, 0.422, 186.611, 379.812)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH2.14" width="20.285" height="39.887" transform="matrix(0.422, -0.906, 0.906, 0.422, 38.938, 592.134)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH2.13" width="17.058" height="39.887" transform="translate(47.506 573.749) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH2.12" width="14.215" height="39.887" transform="translate(54.714 558.289) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH2.11" width="14.215" height="39.887" transform="translate(60.717 545.403) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH2.10" width="14.215" height="39.887" transform="translate(66.724 532.52) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH2.9" width="14.215" height="39.887" transform="translate(72.73 519.636) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH2.8" width="14.215" height="39.887" transform="translate(78.733 506.753) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH2.7" width="14.215" height="39.887" transform="translate(84.74 493.867) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH2.6" width="14.215" height="39.887" transform="translate(90.746 480.983) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH2.5" width="14.215" height="39.887" transform="translate(96.749 468.1) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH2.4" width="14.215" height="39.887" transform="translate(102.756 455.214) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH2.3" width="14.215" height="39.887" transform="translate(108.759 442.33) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH2.2" width="14.215" height="39.887" transform="translate(114.766 429.447) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <path id="SH2.1" d="M1583.957,3184.948l-7.807,16.75,36.153,16.85,6.606-14.173-1.376-3.777Z" transform="translate(-1455.379 -2785.133)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <path id="SH2.27" d="M1355.682,3083.339l-3.778,1.375-6.605,14.173,36.153,16.85,7.807-16.749Z" transform="translate(-1270.833 -2703.907)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH2.26" width="14.215" height="39.887" transform="translate(68.46 407.864) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH2.25" width="14.215" height="39.887" transform="translate(62.453 420.747) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH2.24" width="14.215" height="39.887" transform="translate(56.45 433.63) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH2.23" width="14.215" height="39.887" transform="matrix(0.422, -0.906, 0.906, 0.422, 50.444, 446.517)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH2.22" width="14.215" height="39.887" transform="matrix(0.422, -0.906, 0.906, 0.422, 44.437, 459.4)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH2.21" width="14.215" height="39.887" transform="matrix(0.422, -0.906, 0.906, 0.422, 38.434, 472.283)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH2.20" width="14.215" height="39.887" transform="translate(32.428 485.17) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH2.19" width="14.215" height="39.887" transform="matrix(0.422, -0.906, 0.906, 0.422, 26.421, 498.053)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH2.18" width="14.215" height="39.887" transform="translate(20.418 510.936) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH2.17" width="14.215" height="39.887" transform="translate(14.412 523.823) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH2.16" width="14.215" height="39.887" transform="translate(8.408 536.706) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <path id="SH2.15" d="M1018.63,3884.253l-36.153-16.85-8.407,18.037,13.232,6.167-2.642,5.669,22.921,10.684Z" transform="translate(-974.069 -3330.698)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH3.16" width="14.499" height="39.887" transform="matrix(0.422, -0.906, 0.906, 0.422, 158.574, 544.277)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH3.17" width="14.215" height="39.887" transform="matrix(0.422, -0.906, 0.906, 0.422, 164.698, 531.136)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH3.18" width="14.215" height="39.887" transform="matrix(0.422, -0.906, 0.906, 0.422, 170.704, 518.25)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH3.19" width="14.215" height="39.887" transform="translate(176.71 505.367) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH3.20" width="14.215" height="39.887" transform="matrix(0.422, -0.906, 0.906, 0.422, 182.714, 492.483)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH3.21" width="14.215" height="39.887" transform="matrix(0.422, -0.906, 0.906, 0.422, 188.72, 479.6)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH3.22" width="14.215" height="39.887" transform="matrix(0.422, -0.906, 0.906, 0.422, 194.726, 466.714)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <path id="SH3.23" d="M2018.731,3392.38l-33.577-15.649-3.778,1.375-6.606,14.173,36.153,16.85Z" transform="translate(-1774.042 -2938.45)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <path id="SH3.1" d="M2247,3493.989l-33.576-15.649-7.807,16.75,36.153,16.851,6.606-14.172Z" transform="translate(-1958.584 -3019.677)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH3.2" width="14.215" height="39.887" transform="matrix(0.422, -0.906, 0.906, 0.422, 241.032, 488.297)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH3.3" width="14.215" height="39.887" transform="matrix(0.422, -0.906, 0.906, 0.422, 235.026, 501.181)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH3.4" width="14.215" height="39.887" transform="matrix(0.422, -0.906, 0.906, 0.422, 229.019, 514.067)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH3.5" width="14.215" height="39.887" transform="matrix(0.422, -0.906, 0.906, 0.422, 223.016, 526.95)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH3.6" width="14.215" height="39.887" transform="matrix(0.422, -0.906, 0.906, 0.422, 217.01, 539.833)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH3.7" width="14.215" height="39.887" transform="translate(211.006 552.72) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH3.8" width="14.499" height="39.887" transform="matrix(0.422, -0.906, 0.906, 0.422, 204.879, 565.861)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <path id="SH3.9" d="M2053.168,4106.426,2039,4099.821l-20.209,43.356q5.417,3.8,10.958,7.419l3.268-.927Z" transform="translate(-1809.226 -3516.497)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <path id="SH3.10" d="M1992.338,4075.888l-12.885-6-19.032,40.83q5.777,4.37,11.708,8.531Z" transform="translate(-1762.571 -3492.562)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <path id="SH3.11" d="M1933.7,4045.95l-12.884-6-17.628,37.82q5.658,4.612,11.48,9.018Z" transform="translate(-1716.817 -3468.631)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <path id="SH3.12" d="M1875.993,4016.012l-12.884-6.005-15.99,34.308q5.536,4.86,11.247,9.517Z" transform="translate(-1671.995 -3444.697)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <path id="SH3.13" d="M1819.245,3986.075l-12.885-6.006-14.113,30.28q5.41,5.118,11.007,10.033Z" transform="translate(-1628.128 -3420.766)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <path id="SH3.14" d="M1763.485,3956.137l-12.884-6.006-11.987,25.719q5.28,5.384,10.758,10.567Z" transform="translate(-1585.253 -3396.832)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <path id="SH3.15" d="M1708.231,3923.8l-14.173-6.606-8.446,18.12.563,3.555q4.937,5.415,10.068,10.648Z" transform="translate(-1542.885 -3370.506)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH4.17" width="14.485" height="39.887" transform="matrix(0.422, -0.906, 0.906, 0.422, 278.839, 616)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH4.18" width="14.215" height="39.887" transform="matrix(0.422, -0.906, 0.906, 0.422, 284.96, 602.87)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH4.19" width="14.215" height="39.887" transform="matrix(0.422, -0.906, 0.906, 0.422, 290.964, 589.987)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH4.20" width="14.215" height="39.887" transform="matrix(0.422, -0.906, 0.906, 0.422, 296.97, 577.1)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH4.21" width="14.215" height="39.887" transform="matrix(0.422, -0.906, 0.906, 0.422, 302.974, 564.217)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH4.22" width="14.215" height="39.887" transform="matrix(0.422, -0.906, 0.906, 0.422, 308.98, 551.334)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH4.23" width="14.215" height="39.887" transform="matrix(0.422, -0.906, 0.906, 0.422, 314.986, 538.448)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH4.24" width="14.215" height="39.887" transform="matrix(0.422, -0.906, 0.906, 0.422, 320.99, 525.564)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <path id="SH4.25" d="M2648.2,3685.77l-33.576-15.648-3.778,1.375-6.605,14.173,36.154,16.851Z" transform="translate(-2277.249 -3172.989)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <path id="SH4.1" d="M2876.476,3787.381l-33.576-15.649-7.807,16.75,36.153,16.85,6.606-14.172Z" transform="translate(-2461.79 -3254.217)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH4.2" width="14.215" height="39.887" transform="matrix(0.422, -0.906, 0.906, 0.422, 367.296, 547.148)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH4.3" width="14.215" height="39.887" transform="matrix(0.422, -0.906, 0.906, 0.422, 361.292, 560.031)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH4.4" width="14.215" height="39.887" transform="matrix(0.422, -0.906, 0.906, 0.422, 355.286, 572.914)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH4.5" width="14.215" height="39.887" transform="matrix(0.422, -0.906, 0.906, 0.422, 349.282, 585.8)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH4.6" width="14.215" height="39.887" transform="matrix(0.422, -0.906, 0.906, 0.422, 343.276, 598.684)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH4.7" width="14.215" height="39.887" transform="matrix(0.422, -0.906, 0.906, 0.422, 337.27, 611.567)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH4.8" width="14.215" height="39.887" transform="matrix(0.422, -0.906, 0.906, 0.422, 331.266, 624.453)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH4.9" width="14.485" height="39.887" transform="matrix(0.422, -0.906, 0.906, 0.422, 325.145, 637.58)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <path id="SH4.10" d="M2671.11,4464.05l-14.173-6.605-15.589,33.447,12.221,4.176,3.847-1.638Z" transform="translate(-2306.91 -3802.385)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <path id="SH4.11" d="M2603.022,4433.51l-12.884-6-16.234,34.828,13.529,4.623Z" transform="translate(-2252.993 -3778.45)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <path id="SH4.12" d="M2536.306,4403.572l-12.884-6-16.857,36.167q2.94,1.055,5.9,2.066l7.612,2.6Z" transform="translate(-2199.162 -3754.517)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <path id="SH4.13" d="M2470.309,4373.635l-12.884-6-17.3,37.118q6.619,2.643,13.327,5.053Z" transform="translate(-2146.05 -3730.586)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <path id="SH4.14" d="M2405.163,4343.7l-12.884-6-17.53,37.609q6.508,2.873,13.113,5.513Z" transform="translate(-2093.789 -3706.652)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <path id="SH4.15" d="M2340.862,4313.758l-12.884-6-17.547,37.646q6.4,3.1,12.9,5.968Z" transform="translate(-2042.371 -3682.719)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <path id="SH4.16" d="M2277.17,4281.429,2263,4274.823l-16.123,34.59,1.329,3.907q5.663,2.968,11.42,5.756Z" transform="translate(-1991.562 -3656.395)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH5.16" width="14.485" height="39.887" transform="translate(411.112 661.966) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH5.17" width="14.215" height="39.887" transform="translate(417.23 648.837) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH5.18" width="14.215" height="39.887" transform="matrix(0.422, -0.906, 0.906, 0.422, 423.237, 635.953)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH5.19" width="14.215" height="39.887" transform="matrix(0.422, -0.906, 0.906, 0.422, 429.24, 623.067)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH5.20" width="14.215" height="39.887" transform="matrix(0.422, -0.906, 0.906, 0.422, 435.246, 610.184)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH5.21" width="14.215" height="39.887" transform="matrix(0.422, -0.906, 0.906, 0.422, 441.25, 597.3)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH5.22" width="14.215" height="39.887" transform="matrix(0.422, -0.906, 0.906, 0.422, 447.256, 584.414)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <path id="SH5.23" d="M3277.676,3979.164l-33.577-15.649-3.777,1.375-6.606,14.173,36.153,16.851Z" transform="translate(-2780.452 -3407.53)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <path id="SH5.1" d="M3505.948,4080.773l-33.577-15.65-7.806,16.75,36.154,16.851,6.605-14.172Z" transform="translate(-2964.997 -3488.757)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH5.2" width="14.215" height="39.887" transform="matrix(0.422, -0.906, 0.906, 0.422, 493.562, 605.998)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH5.3" width="14.215" height="39.887" transform="matrix(0.422, -0.906, 0.906, 0.422, 487.556, 618.881)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH5.4" width="14.215" height="39.887" transform="matrix(0.422, -0.906, 0.906, 0.422, 481.552, 631.767)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH5.5" width="14.215" height="39.887" transform="translate(475.546 644.651) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH5.6" width="14.215" height="39.887" transform="translate(469.542 657.534) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH5.7" width="14.215" height="39.887" transform="translate(463.536 670.42) rotate(-65.01)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH5.8" width="14.485" height="39.887" transform="matrix(0.422, -0.906, 0.906, 0.422, 457.418, 683.547)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <path id="SH5.9" d="M3331.745,4693.208l-14.173-6.605-15.281,32.788,12.221,4.177,3.847-1.638Z" transform="translate(-2835.275 -3985.576)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <path id="SH5.10" d="M3263.658,4662.67l-12.885-6-15.927,34.169,13.529,4.623Z" transform="translate(-2781.359 -3961.645)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <path id="SH5.11" d="M3196.858,4632.732l-12.884-6-16.571,35.551,13.528,4.625Z" transform="translate(-2727.444 -3937.711)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <path id="SH5.12" d="M3130.06,4602.795l-12.884-6-17.214,36.934,13.528,4.624Z" transform="translate(-2673.53 -3913.78)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <path id="SH5.13" d="M3063.261,4572.857l-12.884-6.005-17.859,38.314,13.528,4.624Z" transform="translate(-2619.614 -3889.846)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <path id="SH5.14" d="M2996.462,4542.919l-12.884-6.006-18.5,39.7,13.53,4.622Z" transform="translate(-2565.698 -3865.911)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <path id="SH5.15" d="M2929,4510.587l-14.172-6.6-18.024,38.671,1.472,3.457,12.221,4.175Z" transform="translate(-2511.126 -3839.588)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <path id="SH8.22" d="M1908.469,4594.287q-7.333-4.569-14.584-9.264l-21.517,33.835q7.945,5.027,16.085,9.735Z" transform="translate(-1692.177 -3904.372)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <path id="SH8.23" d="M1831.515,4547.068q-7.255-4.7-14.427-9.523l-22.74,33.014q7.721,5.328,15.65,10.344Z" transform="translate(-1629.807 -3866.417)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <path id="SH8.24" d="M1755.739,4497.474q-7.2-4.846-14.151-10.053l-23.982,31.985q7.585,5.7,15.394,11.083Z" transform="translate(-1568.46 -3826.348)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <path id="SH8.26" d="M1611.437,4389.231q-6.634-5.522-13.2-11.126l-26.334,30q7.019,6.245,14.293,12.2Z" transform="translate(-1451.988 -3738.96)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <path id="SH8.25" d="M1643.161,4463.916l14.932,11.707,23.982-31.983-13.528-10.986Z" transform="translate(-1508.948 -3782.567)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <path id="SH8.27" d="M1510.412,4353.69l-15.43-13.544,13.661-29.309,12.366-.8,15.738,13.653Z" transform="translate(-1390.491 -3684.542)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH8.16" width="39.887" height="17.058" transform="translate(296.64 768.816) rotate(-71.133)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH8.15" width="39.887" height="17.058" transform="translate(312.783 774.333) rotate(-71.133)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <path id="SH8.18" d="M2306.834,4784.091q-8.287-2.954-16.456-6.224l-16.14,36.508q9.769,3.937,19.7,7.459Z" transform="translate(-2013.439 -4058.534)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <path id="SH8.19" d="M2227.748,4751.419q-7.92-3.172-15.716-6.636l-16.138,36.505q7.8,3.453,15.714,6.64Z" transform="translate(-1950.808 -4032.087)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <path id="SH8.20" d="M2138.463,4713.1q-8.553-3.8-16.943-7.951l-17.654,35.831q9.142,4.5,18.46,8.625Z" transform="translate(-1877.24 -4000.403)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <path id="SH8.21" d="M2043.916,4667.958q-9.034-4.467-17.865-9.331l-19.261,35.045q9.624,5.272,19.473,10.117Z" transform="translate(-1799.636 -3963.211)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH8.17" width="39.887" height="17.058" transform="translate(280.5 763.3) rotate(-71.133)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH9.10" width="17.058" height="39.887" transform="matrix(0.437, -0.9, 0.9, 0.437, 765.662, 960.521)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH9.9" width="17.058" height="39.887" transform="translate(773.116 945.18) rotate(-64.093)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH9.8" width="17.058" height="39.887" transform="translate(780.567 929.835) rotate(-64.093)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <path id="SH9.7" d="M4947.9,5663.132l-4.1-8.482-30.771-11.025-10.441,21.5,35.879,17.426Z" transform="translate(-4114.572 -4750.63)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <path id="SH9.1" d="M4719.3,5574.184l-35.127-12.63-3.865,1.611-6.813,14.026,35.88,17.429Z" transform="translate(-3931.427 -4685.021)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH9.2" width="17.058" height="39.887" transform="translate(734.614 907.515) rotate(-64.093)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH9.3" width="17.058" height="39.887" transform="translate(727.16 922.857) rotate(-64.093)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH9.4" width="17.058" height="39.887" transform="translate(719.706 938.201) rotate(-64.093)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH9.5" width="17.058" height="39.887" transform="translate(712.255 953.546) rotate(-64.093)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <path id="SH9.6" d="M4495.172,5945.485l-7.454,15.344,1.319,3.812,33.314,16.181,8.7-17.909Z" transform="translate(-3782.915 -4991.94)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <path id="SH9.11" d="M4778.986,5997.7l-35.881-17.425-12.048,24.8,33.323,16.184,3.8-1.315Z" transform="translate(-3977.444 -5019.75)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH10.21" width="17.058" height="39.887" transform="matrix(0.437, -0.9, 0.9, 0.437, 791.174, 791.072)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH10.20" width="17.058" height="39.887" transform="matrix(0.437, -0.9, 0.9, 0.437, 798.625, 775.727)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH10.19" width="17.058" height="39.887" transform="matrix(0.437, -0.9, 0.9, 0.437, 806.079, 760.383)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH10.18" width="17.058" height="39.887" transform="matrix(0.437, -0.9, 0.9, 0.437, 813.533, 745.041)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH10.17" width="18.479" height="39.887" transform="translate(820.984 729.696) rotate(-64.093)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH10.40" width="18.479" height="39.887" transform="translate(866.94 752.018) rotate(-64.093)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH10.41" width="17.058" height="39.887" transform="translate(859.486 767.36) rotate(-64.093)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH10.42" width="17.058" height="39.887" transform="matrix(0.437, -0.9, 0.9, 0.437, 852.035, 782.705)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH10.43" width="17.058" height="39.887" transform="translate(844.581 798.05) rotate(-64.093)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH10.44" width="17.058" height="39.887" transform="matrix(0.437, -0.9, 0.9, 0.437, 837.127, 813.392)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH10.45" width="17.058" height="39.887" transform="matrix(0.437, -0.9, 0.9, 0.437, 829.676, 828.736)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <path id="SH10.46" d="M5063.331,5323.276l-11.774,24.238,37.636,10.613,2.061-1.049,7.956-16.375Z" transform="translate(-4233.653 -4494.54)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH10.22" width="17.058" height="39.887" transform="translate(783.72 806.414) rotate(-64.093)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <path id="SH10.23" d="M4865.994,5229.422,4830.115,5212l-12.806,26.363,3.277,7.868,32.757,9.238Z" transform="translate(-4046.395 -4405.582)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH10.39" width="18.48" height="39.887" transform="translate(879.983 725.168) rotate(-64.093)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH10.38" width="17.058" height="39.887" transform="matrix(0.437, -0.9, 0.9, 0.437, 888.056, 708.544)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH10.37" width="17.058" height="39.887" transform="translate(895.51 693.199) rotate(-64.093)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH10.36" width="17.058" height="39.887" transform="matrix(0.437, -0.9, 0.9, 0.437, 902.964, 677.857)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH10.35" width="17.058" height="39.887" transform="translate(910.415 662.513) rotate(-64.093)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH10.34" width="17.058" height="39.887" transform="matrix(0.437, -0.9, 0.9, 0.437, 917.869, 647.168)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH10.33" width="17.058" height="39.887" transform="matrix(0.437, -0.9, 0.9, 0.437, 925.32, 631.826)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH10.32" width="17.058" height="39.887" transform="matrix(0.437, -0.9, 0.9, 0.437, 932.774, 616.481)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH10.31" width="17.058" height="39.887" transform="matrix(0.437, -0.9, 0.9, 0.437, 940.228, 601.139)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH10.30" width="18.479" height="39.887" transform="translate(947.679 585.795) rotate(-64.093)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH10.7" width="18.479" height="39.887" transform="translate(901.726 563.472) rotate(-64.093)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH10.8" width="17.058" height="39.887" transform="translate(894.272 578.817) rotate(-64.093)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH10.9" width="17.058" height="39.887" transform="matrix(0.437, -0.9, 0.9, 0.437, 886.818, 594.162)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH10.10" width="17.058" height="39.887" transform="matrix(0.437, -0.9, 0.9, 0.437, 879.367, 609.503)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH10.11" width="17.058" height="39.887" transform="matrix(0.437, -0.9, 0.9, 0.437, 871.913, 624.848)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH10.12" width="17.058" height="39.887" transform="translate(864.462 640.193) rotate(-64.093)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH10.13" width="17.058" height="39.887" transform="translate(857.008 655.535) rotate(-64.093)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH10.14" width="17.058" height="39.887" transform="translate(849.554 670.879) rotate(-64.093)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH10.15" width="17.058" height="39.887" transform="translate(842.103 686.224) rotate(-64.093)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH10.16" width="18.48" height="39.887" transform="translate(834.027 702.846) rotate(-64.093)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH10.6" width="18.48" height="39.887" transform="matrix(0.437, -0.9, 0.9, 0.437, 914.769, 536.622)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH10.5" width="17.058" height="39.887" transform="matrix(0.437, -0.9, 0.9, 0.437, 922.842, 520)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH10.4" width="17.058" height="39.887" transform="matrix(0.437, -0.9, 0.9, 0.437, 930.296, 504.656)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH10.3" width="17.058" height="39.887" transform="translate(937.747 489.314) rotate(-64.093)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH10.2" width="17.058" height="39.887" transform="translate(945.201 473.969) rotate(-64.093)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <path id="SH10.1" d="M5771.637,3373.043l-33.323-16.185-3.8,1.314-11.18,23.016,35.881,17.428Z" transform="translate(-4770.682 -2922.564)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <path id="SH10.24" d="M5964.856,3461.945l-12.421,25.572,35.877,17.428,11.181-23.015-1.315-3.8Z" transform="translate(-4953.827 -3006.57)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH10.25" width="17.058" height="39.887" transform="matrix(0.437, -0.9, 0.9, 0.437, 991.157, 496.289)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH10.26" width="17.058" height="39.887" transform="matrix(0.437, -0.9, 0.9, 0.437, 983.703, 511.634)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH10.27" width="17.058" height="39.887" transform="translate(976.249 526.978) rotate(-64.093)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH10.28" width="17.058" height="39.887" transform="translate(968.797 542.32) rotate(-64.093)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH10.29" width="18.48" height="39.887" transform="matrix(0.437, -0.9, 0.9, 0.437, 960.722, 558.944)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <path id="SH11.42" d="M6107.285,3168.72l-12.423,25.573,33.322,16.185,3.8-1.315,11.178-23.016Z" transform="translate(-5067.683 -2772.164)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH11.41" width="17.058" height="39.887" transform="matrix(0.437, -0.9, 0.9, 0.437, 1039.599, 396.557)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH11.40" width="17.058" height="39.887" transform="translate(1047.053 381.212) rotate(-64.093)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH11.39" width="17.058" height="39.887" transform="translate(1054.507 365.87) rotate(-64.093)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH11.38" width="17.058" height="39.887" transform="matrix(0.437, -0.9, 0.9, 0.437, 1061.958, 350.526)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH11.37" width="18.479" height="39.887" transform="translate(1069.412 335.181) rotate(-64.093)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH11.16" width="18.479" height="39.887" transform="translate(1023.456 312.861) rotate(-64.093)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH11.17" width="17.058" height="39.887" transform="matrix(0.437, -0.9, 0.9, 0.437, 1016.005, 328.203)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH11.18" width="17.058" height="39.887" transform="translate(1008.551 343.548) rotate(-64.093)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH11.19" width="17.058" height="39.887" transform="translate(1001.097 358.892) rotate(-64.093)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH11.20" width="17.058" height="39.887" transform="translate(993.646 374.234) rotate(-64.093)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <path id="SH11.21" d="M5919.016,3074.869l-35.878-17.427-11.18,23.015,1.316,3.8,33.322,16.186Z" transform="translate(-4889.491 -2683.207)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH11.8" width="17.058" height="39.887" transform="matrix(0.437, -0.9, 0.9, 0.437, 1089.29, 177.324)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH11.7" width="17.058" height="39.887" transform="matrix(0.437, -0.9, 0.9, 0.437, 1096.744, 161.982)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH11.6" width="17.058" height="39.887" transform="matrix(0.437, -0.9, 0.9, 0.437, 1104.198, 146.637)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH11.5" width="17.058" height="39.887" transform="translate(1111.649 131.293) rotate(-64.093)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH11.4" width="17.058" height="39.887" transform="translate(1119.103 115.951) rotate(-64.093)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH11.3" width="17.058" height="39.887" transform="translate(1126.557 100.606) rotate(-64.093)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH11.2" width="17.058" height="39.887" transform="translate(1134.008 85.261) rotate(-64.093)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <path id="SH11.1" d="M6714.144,1422.47l-33.32-16.185-3.8,1.315-12.421,25.572,35.879,17.427Z" transform="translate(-5523.141 -1363.253)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <path id="SH11.22" d="M6942,1531.356l-1.314-3.8-33.322-16.185L6893.7,1539.5l35.88,17.427Z" transform="translate(-5706.283 -1447.262)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH11.23" width="17.058" height="39.887" transform="matrix(0.437, -0.9, 0.9, 0.437, 1179.964, 107.584)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH11.24" width="17.058" height="39.887" transform="translate(1172.51 122.929) rotate(-64.093)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH11.25" width="17.058" height="39.887" transform="translate(1165.056 138.271) rotate(-64.093)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH11.26" width="17.058" height="39.887" transform="matrix(0.437, -0.9, 0.9, 0.437, 1157.605, 153.615)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH11.27" width="17.058" height="39.887" transform="translate(1150.151 168.96) rotate(-64.093)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH11.28" width="17.058" height="39.887" transform="translate(1142.7 184.302) rotate(-64.093)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH11.29" width="17.058" height="39.887" transform="matrix(0.437, -0.9, 0.9, 0.437, 1135.246, 199.647)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH11.30" width="17.058" height="39.887" transform="matrix(0.437, -0.9, 0.9, 0.437, 1127.792, 214.988)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH11.31" width="17.058" height="39.887" transform="matrix(0.437, -0.9, 0.9, 0.437, 1120.341, 230.333)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH11.32" width="17.058" height="39.887" transform="matrix(0.437, -0.9, 0.9, 0.437, 1112.887, 245.678)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH11.33" width="17.058" height="39.887" transform="matrix(0.437, -0.9, 0.9, 0.437, 1105.433, 261.02)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH11.34" width="17.058" height="39.887" transform="translate(1097.982 276.364) rotate(-64.093)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH11.35" width="17.058" height="39.887" transform="matrix(0.437, -0.9, 0.9, 0.437, 1090.528, 291.709)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH11.36" width="18.48" height="39.887" transform="matrix(0.437, -0.899, 0.899, 0.437, 1082.452, 308.331)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH11.15" width="18.48" height="39.887" transform="translate(1036.499 286.008) rotate(-64.093)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH11.14" width="17.058" height="39.887" transform="translate(1044.575 269.386) rotate(-64.093)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH11.13" width="17.058" height="39.887" transform="matrix(0.437, -0.9, 0.9, 0.437, 1052.026, 254.042)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH11.12" width="17.058" height="39.887" transform="matrix(0.437, -0.9, 0.9, 0.437, 1059.48, 238.7)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH11.11" width="17.058" height="39.887" transform="translate(1066.934 223.355) rotate(-64.093)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH11.10" width="17.058" height="39.887" transform="translate(1074.385 208.013) rotate(-64.093)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH11.9" width="17.058" height="39.887" transform="translate(1081.839 192.669) rotate(-64.093)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <path id="SH12.7" d="M33.951,7.45,18.614,0,0,38.321l15.322,7.441Z" transform="matrix(0.998, -0.07, 0.07, 0.998, 1381.216, 39.561)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH12.6" width="42.602" height="17.058" transform="matrix(0.375, -0.927, 0.927, 0.375, 1368.013, 71.451)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH12.5" width="42.602" height="17.058" transform="matrix(0.375, -0.927, 0.927, 0.375, 1352.199, 65.06)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH12.4" width="42.602" height="17.058" transform="matrix(0.375, -0.927, 0.927, 0.375, 1336.382, 58.671)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH12.3" width="42.602" height="17.058" transform="matrix(0.375, -0.927, 0.927, 0.375, 1320.568, 52.28)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH12.2" width="42.602" height="17.058" transform="matrix(0.375, -0.927, 0.927, 0.375, 1304.751, 45.889)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
    <rect id="SH12.1" width="42.602" height="17.058" transform="matrix(0.375, -0.927, 0.927, 0.375, 1288.934, 39.501)" fill="rgba(210,156,55,0.5)" stroke="#fff" stroke-width="0.5"/>
  </g>
  <path id="NHÀ Ở XÃ HỘI 1 - K2" data-name="NHÀ Ở XÃ HỘI 1 - K2" d="M1367.347,4934.636l5.787-16.933a4.548,4.548,0,0,1,5.776-2.833l31.17,10.652a10.225,10.225,0,0,1,4.614,3.208l4.784,5.852a12.5,12.5,0,0,0,5.64,3.919l38.537,13.169a12.525,12.525,0,0,0,6.85.355l7.27-1.673a10.235,10.235,0,0,1,5.6.288l52.015,17.776a4.015,4.015,0,0,1,2.473,4.955l-1.457,4.263c9.781,3.343,9.044,2.247-11.227,49.65a4.99,4.99,0,0,0-5.877,2.458,4.334,4.334,0,0,1-4.634.925l-86.024-29.4a6.819,6.819,0,0,0-7.25,1.859,4.522,4.522,0,0,1-4.823,1.217l-1.382-.473-71.126-24.306C1341.616,4978.875,1361.363,4948.266,1367.347,4934.636Z" transform="translate(-726.693 -3813.148)" fill="rgba(42,79,182,0.6)" stroke="#fff" stroke-width="0.5"/>
  <path id="NHÀ Ở XÃ HỘI 1 - K3" data-name="NHÀ Ở XÃ HỘI 1 - K3" d="M1490.8,4965.9a1.136,1.136,0,0,0,1.444-.708,1.152,1.152,0,0,0,.058-.287l4.406-12.893a4.55,4.55,0,0,1,5.775-2.833l35.085,11.989a10.226,10.226,0,0,1,3.169,1.762l10.251,8.382a12.493,12.493,0,0,0,3.873,2.153l24.087,8.232a12.492,12.492,0,0,0,4.433.666l12.993-.4a10.208,10.208,0,0,1,3.627.545l56.135,19.185a10.234,10.234,0,0,1,6.375,12.995l-14.259,41.725a10.236,10.236,0,0,1-12.995,6.375l-84.193-28.773a6.827,6.827,0,0,0-6.675,1.3,4.548,4.548,0,0,1-4.45.867l-.237-.081-69.316-23.687C1468.093,5011.708,1489.033,4969.814,1490.8,4965.9Z" transform="translate(-666.743 -3788.304)" fill="rgba(42,79,182,0.6)" stroke="#fff" stroke-width="0.5"/>
  <rect id="HILTON GARDEN INN" data-name="HILTON GARDEN INN" width="230.714" height="169.724" rx="18" transform="translate(219.527 913.383) rotate(17)" fill="rgba(182,163,42,0.6)" stroke="#fff" stroke-width="0.5"/>
  <rect id="THƯƠNG MẠI DỊCH VỤ" data-name="THƯƠNG MẠI DỊCH VỤ" width="115.555" height="118.518" rx="15" transform="translate(1620.955 248.13) rotate(22)" fill="rgba(182,80,42,0.6)" stroke="#fff" stroke-width="0.5"/>
  <rect id="PHỐ ĐI BỘ" data-name="PHỐ ĐI BỘ" width="84.12" height="1168.09" rx="15" transform="matrix(0.899, 0.438, -0.438, 0.899, 1524.61, 258.26)" fill="rgba(42,177,182,0.6)" stroke="#fff" stroke-width="0.5"/>
  <rect id="ĐƯỜNG D1" data-name="ĐƯỜNG D1" width="84.12" height="1168.09" rx="15" transform="matrix(0.899, 0.438, -0.438, 0.899, 1524.61, 258.26)" fill="rgba(42,177,182,0.6)" stroke="#fff" stroke-width="0.5"/>
  <rect id="ĐƯỜNG D2" data-name="ĐƯỜNG D2" width="36.869" height="1044.435" rx="15" transform="matrix(0.899, 0.438, -0.438, 0.899, 1650.159, 411.663)" fill="rgba(42,177,182,0.6)" stroke="#fff" stroke-width="0.5"/>
  <rect id="CẦU" width="84.12" height="132.663" rx="15" transform="matrix(0.899, 0.438, -0.438, 0.899, 1592.192, 120.776)" fill="rgba(42,177,182,0.6)" stroke="#fff" stroke-width="0.5"/>
  <path id="TRƯỜNG ĐẠI HỌC XÂY DỰNG MIỀN TÂY" data-name="TRƯỜNG ĐẠI HỌC XÂY DỰNG MIỀN TÂY" d="M-15520.261-19329.111c8.808,3.123,681.084,297.994,681.084,297.994l314.121-630.213s-352.284-156.109-364.027-156.109-190.821,182.127-311.186,237.055-249.535,141.654-270.085,161.889S-15529.068-19332.234-15520.261-19329.111Z" transform="translate(16019.633 19944.499)" fill="rgba(126,182,42,0.6)" stroke="#fff" stroke-width="0.5"/>
  <rect id="boder" width="2048" height="1600" transform="translate(0.25 3.333)" fill="none"/>
  <rect id="boder-2" data-name="boder" width="2048" height="1600" transform="translate(0.25 3.333)" fill="none"/>
  <path id="DÒNG SÔNG ÁNH SÁNG" data-name="DÒNG SÔNG ÁNH SÁNG" d="M-15871.378-18875.566s157.109,78.2,459.791,167.154,750.937,188.658,750.937,188.658,55.763,26.643,100.158,22.316,77.424-39.621,77.424-39.621l250.91-171.354s19.508-8.836,28.249-22.787,6.715-33.016,6.715-33.016V-19504.1l52.228,17.408v710.877s7.979,46.424-11.606,78.34-66.735,49.326-66.735,49.326l-275.646,185.7s6.912,45.645-12.673,52.172-65.668-26.059-65.668-26.059-545.369-138.035-874.467-233.895-441.925-149.541-441.925-149.541Z" transform="translate(16020.25 19939.333)" fill="rgba(42,177,182,0.6)" stroke="#fff" stroke-width="0.5"/>
  <path id="SÔNG CÁI CÁ" data-name="SÔNG CÁI CÁ" d="M-16020-18582.338l213.359-409.289s226.013-360.162,231.224-373.189c6.349-15.871,80.924-117.391,246.412-224.973,137.479-89.375,370.077-188.137,383.221-198.65,29.015-23.211,46.424-43.523,46.424-43.523l-171.189-95.75h-124.767s-475.852,452.637-539.685,528.078-285,464.246-285,464.246Z" transform="translate(16020.25 19939.333)" fill="rgba(42,177,182,0.6)" stroke="#fff" stroke-width="0.5"/>
</svg>





    `,
    topPercent: 50,   // ví dụ: 10% từ trên
    leftPercent: 48,  // ví dụ: 15% từ trái
  
  },
  // thêm SVG khác ...
];