declare var Chart;

var label = [];
var data = [];
var data1 = [];
var pol;

var slope;

function draw_chart() {
	document.getElementById('hide_panel3').click();

	pp.clearleftpannel();
	pp.clearrightpannel();
	pp.addoffcanvas(3);
	pp.addcanvas('myChart');

	pp.showtitle(
		`<p id="exp-title" style="width:20vw;">Calculate slope</p>`,
		3
	);

	if (document.getElementById('panel1_btn')) {
		document.getElementById('panel1_btn').remove();
	}

	// pp.addButtonToRightPanel("hello", print_hello, 3);

	for (let i = 0; i < main_table_data.length; i++) {
		label.push(main_table_data[i][4]);
		data.push(main_table_data[i][5]);
	}

	calculate_y_datapoints();
	var ctx = document.getElementById('myChart');
	ctx.style.backgroundColor = 'white';
	ctx.style.marginTop = '5px';
	ctx.style.marginLeft = '10%';
	ctx.style.padding = '10px';
	ctx.style.borderRadius = '8px';
	if (typeof chart != 'undefined') {
		chart.destroy();
	}
	// let labels = [0.004, 0.007, 0.010, 0.014, 0.020, 0.029, 0.039];
	// let data1=[82.28,96.86,104.07,108.28,112.48,117.68,125.35];//hi_expt
	// let data2=[146.90,183.50,204.11,230.09,256.89,290.83,323.49];//hi_st
	var chart = new Chart(ctx, {
		type: 'scatter',
		data: {
			labels: label,
			datasets: [
				{
					label: 'Experimental',
					data: data,
					fill: false,
					borderColor: 'blue',
					tension: 0.5,
					showLine: false,
					// yAxisID: 'A',
					// borderWidth: 1,
					// borderColor: "green",
					// backgroundColor: "rgba(34, 139, 34, 0.5)",
				},
				{
					label: 'Best Fit',
					data: data1,
					fill: false,
					borderColor: 'red',
					tension: 0.5,
					showLine: true,
					// yAxisID: 'A',
					// borderWidth: 1,
					// borderColor: "red",
					// backgroundColor: "rgba(255, 0, 0, 0.5)",
				},
			],
		},
		options: {
			maintainAspectRatio: true,
			scales: {
				y: {
					title: {
						display: true,
						text: 'log(Is)',
						font: { size: 14, weight: 'bold' },
					},
				},
				x: {
					title: {
						display: true,
						text: '1000/T',
						font: { size: 14, weight: 'bold' },
					},
				},
			},
			plugins: {
				title: {
					display: true,
					text: `${material}`,
					font: { size: 18 },
				},
				legend: { labels: { font: { size: 14, weight: 'bold' } } },
			},
		},
	});
}

function calculate_y_datapoints() {
	pol = regression_linear(label, data);

	// console.log(pol);
	for (let i = 0; i < label.length; i++) {
		data1.push(pol[0] * label[i] + pol[1]);
	}

	slope = pol[0];

	calculated_energy_band_gap = Math.abs(0.5036 / slope);

	pp.showdescription('', 3);

	let text_box = `
    <div>
    <div>
        <label for="x1">X<sub>1</sub> value</label>
        <input type="text" name="" id="x1" />
    </div>

    <br>

    <div>
        <label for="x2">X<sub>2</sub> value</label>
        <input type="text" name="" id="x2" />
    </div>

    <br>

    <div>
        <label for="y1">Y<sub>1</sub> value</label>
        <input type="text" name="" id="y1" />
    </div>

    <br>

    <div>
        <label for="y2">Y<sub>2</sub> value</label>
        <input type="text" name="" id="y2" />
    </div>

    <br>

    <div><label for="slope">Enter Slope value</label>
        <input type="text" name="" id="cal_slope" />
    </div>

    <br>

    <button class="btn btn-primary" onclick="verify_act7();">Check</button>
    </div>
    `;

	pp.addtorightpannel(text_box, 3);
}

function verify_act7() {
	console.log(slope);

	let val1: HTMLInputElement = <HTMLInputElement>(
		document.getElementById(`cal_slope`)
	);

	if (!verify_values(Math.abs(parseFloat(val1.value)), Math.abs(slope))) {
		alert(`please check slope`);
		return;
	}

	pp.showtitle(
		`<p id="exp-title" style="width:20vw;">Calculate energy band gap</p>`,
		3
	);
	pp.showdescription(
		`<p class='discription_text'>Entered Slope Value is correct.</p>`,
		3
	);

	document.getElementById('myChart').remove();

	let left_panel_text = `
    <div id="band-gap-text">

    <h3>The experimental value of energy band gap of ${material} = <span id="bg-val"><input class="form-control" style="width: 25%;" type="text" id="cal_bg"></span> volt</h3>

    <br>
    <h3>Energy Band Gap = 0.5036/slope</h3>

    <br>

    <button id="vbg" onclick="verify_band_gap();" class="btn btn-primary">Verify</button>

    </div>
    `;

	pp.addtoleftpannel(left_panel_text);
}

function verify_band_gap() {
	let val1: HTMLInputElement = <HTMLInputElement>(
		document.getElementById(`cal_bg`)
	);

	if (
		!verify_values(
			Math.abs(parseFloat(val1.value)),
			calculated_energy_band_gap
		)
	) {
		alert(`please check slope`);
		return;
	}

	pp.clearrightpannel();
	pp.addoffcanvas(3);
	show_panel(3);

	pp.showdescription(
		`<p class='discription_text'>Calculated Band Gap Value is correct.</p>`,
		3
	);

	document.getElementById('vbg').remove();

	let ele = document.getElementById('band-gap-text');

	ele.innerHTML += `
    <h3>Standard Engery Band Gap for ${material} = <span style="color: blue;">${std_band_gap}</span> volt</h3>

    <div>

      <h3>Is calculated band gap greater than standard band gap?</h3>

      <label for="radio-1">Yes</label>
      <input id='radio-1' style="display: inline; width: 10%;" type="radio" name="ans">

      <br>

      <label for="radio-2">No</label>
      <input id='radio-2' style="display: inline; width: 10%;" type="radio" name="ans">

      <button class="btn btn-primary" type='button' onclick='compare_band_gap();' style="position:absolute; left:2vw; top:25vw;">Submit</button>
      </div>
    `;

	document.getElementById('bg-val').innerText =
		calculated_energy_band_gap.toFixed(3);
	document.getElementById('bg-val').style.color = 'blue';
}

function compare_band_gap() {
	let ra1: HTMLInputElement = <HTMLInputElement>(
		document.getElementById('radio-1')
	);
	let ra2: HTMLInputElement = <HTMLInputElement>(
		document.getElementById('radio-2')
	);

	let ans: boolean;
	if (calculated_energy_band_gap > std_band_gap) {
		ans = true;
	} else {
		ans = false;
	}

	if (ra1.checked && ans) {
		alert('Correct Answer!!');
	} else if (ra2.checked && !ans) {
		alert('Correct Answer!!');
	} else {
		alert('Your Answer is incorrect, please the values again.');
	}

	console.log(ra1.checked);
	console.log(ra2.checked);
}

var calculated_energy_band_gap;

// //   activity5();

// var column = ['Sr No.', "test-1", "test-2", "test-3"];

// function print_hello() {
//     console.log("hello");

//     // pp.button.remove();

//     pp.clearleftpannel();
//     // var data = [["1", "<input type='text' id='val-0-0' />", "<input type='text' id='val-0-1' />", "<input value='verify' type='button' class='btn btn-primary' onclick='myverify(0);' />"], ["2","<input type='text' id='val-1-0' />", "<input type='text' id='val-1-1' />", "<input value='verify' type='button' class='btn btn-primary' onclick='myverify(1);' />"]];
//     // var table = new Table(column, data);
//     // pp.addtoleftpannel(table.template);
//     // let arr = [2, 3];
//     // table.draw();
//     // table.load_with_inputs(arr);
// }

// var verify_variable = [[1, 2], [3, 4]];

// function myverify(i) {
//     for(let j=0; j<=1; j++) {
//         let ele: HTMLInputElement = <HTMLInputElement> document.getElementById(`val-${i}-${j}`);
//         if(!verify_values(parseFloat(ele.value), verify_variable[i][j])) {
//             alert(`please check ${column[j+1]}`);
//             return;
//         }
//     }
// }
