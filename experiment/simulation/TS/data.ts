var act5_table_data: string[][] = [
	['1', '25', '1', '0.73', '0.03', '0.8411', '1.385'],
	['2', '25', '0.75', '0.6', '0.018', '0.6624', '0.97635'],
	['3', '25', '0.5', '0.4', '0.016', '0.4394', '0.89295'],
	['4', '25', '0.25', '0.22', '0.01', '0.2294', '0.50116'],
];

var act4_table_data: string[][] = [
	['1', '100', '0.30', '5.52', '3.61', '9.354'],
	['2', '100', '0.39', '3.33', '5.99', '9.886'],
	['3', '100', '0.47', '2.40', '8.30', '10.0'],
];

var main_table_data: number[][] = [];

var energy_band = [
	{
		name: 'Germanium',
		t: [
			80, 79, 78, 77, 76, 75, 74, 73, 72, 71, 70, 69, 68, 67, 66, 65, 64,
			63, 62, 61, 60, 59, 58, 57, 56, 55, 54, 53, 52, 51, 50, 49, 48, 47,
			46, 45, 44, 43, 42, 41, 40,
		],
		v1: [
			202, 198, 194, 191, 187, 184, 181, 177, 174, 171, 168, 165, 162,
			159, 156, 154, 151, 149, 146, 144, 141, 139, 136, 134, 132, 130,
			128, 125, 123, 121, 119, 118, 116, 114, 112, 110, 108, 107, 105,
			103, 102,
		],
		v2: [
			207, 203, 199, 196, 192, 189, 186, 182, 179, 176, 173, 170, 167,
			164, 161, 159, 156, 154, 151, 149, 146, 144, 141, 139, 137, 135,
			133, 130, 128, 126, 124, 123, 121, 119, 117, 115, 113, 112, 110,
			108, 107,
		],
		v3: [
			212, 208, 204, 201, 197, 194, 191, 187, 184, 181, 178, 175, 172,
			169, 166, 164, 161, 159, 156, 154, 151, 149, 146, 144, 142, 140,
			138, 135, 133, 131, 129, 128, 126, 124, 122, 120, 118, 117, 115,
			113, 112,
		],
		v4: [
			217, 213, 209, 206, 202, 199, 196, 192, 189, 186, 183, 180, 177,
			174, 171, 169, 166, 164, 161, 159, 156, 154, 151, 149, 147, 145,
			143, 140, 138, 136, 134, 133, 131, 129, 127, 125, 123, 122, 120,
			118, 117,
		],
		band_gap: 0.7,
	},

	{
		name: 'Silicon',
		t: [
			80, 79, 78, 77, 76, 75, 74, 73, 72, 71, 70, 69, 68, 67, 66, 65, 64,
			63, 62, 61, 60, 59, 58, 57, 56, 55, 54, 53, 52, 51, 50, 49, 48, 47,
			46, 45, 44, 43, 42, 41, 40,
		],
		v1: [
			30.6, 30.3, 30.0, 29.7, 29.3, 29.0, 28.7, 28.4, 28.1, 27.8, 27.5,
			27.2, 27.0, 26.7, 26.4, 26.1, 25.9, 25.6, 25.4, 25.1, 24.9, 24.6,
			24.4, 24.2, 23.9, 23.7, 23.5, 23.3, 23.0, 22.8, 22.6, 22.4, 22.2,
			22.0, 21.8, 21.6, 21.4, 21.2, 21.0, 20.9, 20.7,
		],
		v2: [
			31.6, 31.3, 31.0, 30.7, 30.3, 30.0, 29.7, 29.4, 29.1, 28.8, 28.5,
			28.2, 28.0, 27.7, 27.4, 27.1, 26.9, 26.6, 26.4, 26.1, 25.9, 25.6,
			25.4, 25.2, 24.9, 24.7, 24.5, 24.3, 24.0, 23.8, 23.6, 23.4, 23.2,
			23.0, 22.8, 22.6, 22.4, 22.2, 22.0, 21.9, 21.7,
		],
		v3: [
			32.6, 32.3, 32.0, 31.7, 31.3, 31.0, 30.7, 30.4, 30.1, 29.8, 29.5,
			29.2, 29.0, 28.7, 28.4, 28.1, 27.9, 27.6, 27.4, 27.1, 26.9, 26.6,
			26.4, 26.2, 25.9, 25.7, 25.5, 25.3, 25.0, 24.8, 24.6, 24.4, 24.2,
			24.0, 23.8, 23.6, 23.4, 23.2, 23.0, 22.9, 22.7,
		],
		v4: [
			33.6, 33.3, 33.0, 32.7, 32.3, 32.0, 31.7, 31.4, 31.1, 30.8, 30.5,
			30.2, 30.0, 29.7, 29.4, 29.1, 28.9, 28.6, 28.4, 28.1, 27.9, 27.6,
			27.4, 27.2, 26.9, 26.7, 26.5, 26.3, 26.0, 25.8, 25.6, 25.4, 25.2,
			25.0, 24.8, 24.6, 24.4, 24.2, 24.0, 23.9, 23.7,
		],
		band_gap: 1.1,
	},
];

function add_std_deviation() {
	for (let i = 0; i < energy_band.length; i++) {
		for (let j = 0; j < energy_band[i].t.length; j++) {
			energy_band[i].v1[j] = parseFloat(
				std_deviation(energy_band[i].v1[j]).toFixed(2)
			);
			energy_band[i].v2[j] = parseFloat(
				std_deviation(energy_band[i].v2[j]).toFixed(2)
			);
			energy_band[i].v3[j] = parseFloat(
				std_deviation(energy_band[i].v3[j]).toFixed(2)
			);
			energy_band[i].v4[j] = parseFloat(
				std_deviation(energy_band[i].v4[j]).toFixed(2)
			);
		}
	}
}

add_std_deviation();

let temp_reading: number[] = [];
let Is_reading: number[] = [];
let T: number[] = [];
let IS: number[] = [];
let material: string = '';
let selected_voltage: number = 0;
let volt: string = '';
let temp_least_count: number = 0;
