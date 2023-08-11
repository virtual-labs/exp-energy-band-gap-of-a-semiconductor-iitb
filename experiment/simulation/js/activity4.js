var std_band_gap;
var reading = 0;
var anim = false;
var heater_on_btn;
var heater_off_btn;
var temp1;
var temp2;
var temp3;
var temp4;
var Is1;
var Is2;
var Is3;
var Is4;
var act4_first_btn = `<button id="panel1_btn" class="btn btn-primary" onclick="act4_verify();" style="
position: absolute; bottom: 8vh; width: 85%;">Next</button>`;
function activity4() {
    pp.clearleftpannel();
    pp.clearrightpannel();
    pp.addoffcanvas(3);
    pp.showtitle('Determine the energy band gap (Eg) of semiconductor', 3);
    load_input_fields();
    let table1 = `<div class='table-responsive' style="position:absolute; right:12vw; top:4vw;">
      <table class='table'>
         <thead class='table-dark'>
            <tr>
            <td>S No.</td>
            <td>Temp(&deg;C)</td>
            <td>Saturation Current(I<sub>s</sub>)&mu;A</td>
            </tr>
         </thead>
         <tbody>
            <tr>
               <td>1</td>
               <td style="width:10vw"><input type='text' class='form-control' id='temp-inp-1' /></td>
               <td style="width:10vw"><input type='text' class='form-control' id='Is-inp-1' /></td>
            </tr>
            <tr>
               <td>2</td>
               <td style="width:10vw"><input type='text' class='form-control' id='temp-inp-2' /></td>
               <td style="width:10vw"><input type='text' class='form-control' id='Is-inp-2' /></td>
            </tr>
            <tr>
               <td>3</td>
               <td style="width:10vw"><input type='text' class='form-control' id='temp-inp-3' /></td>
               <td style="width:10vw"><input type='text' class='form-control' id='Is-inp-3' /></td>
            </tr>
            <tr>
               <td>4</td>
               <td style="width:10vw"><input type='text' class='form-control' id='temp-inp-4' /></td>
               <td style="width:10vw"><input type='text' class='form-control' id='Is-inp-4' /></td>
            </tr>
         </tbody>
      </table>
   </div>`;
    pp.addtoleftpannel(table1);
    pp.addcanvas('mycanvas');
    pp.showtitle(`<p id="exp-title">Simulation with the Experimental Setup</p>`, 3);
    canvas = pp.canvas;
    context = canvas.getContext('2d');
    // add rect and scene
    canvas.style.cursor = 'crosshair';
    rect = canvas.getBoundingClientRect();
    scene = new Scene();
    let heater = new Chemistry.Rectangle(200, 100, new Chemistry.Point(800, 770), canvas);
    heater.color = '#3399ff';
    let heater_text = new Chemistry.Geo_Text('Heater Control', new Chemistry.Point(820, 840), canvas);
    heater_text.font = '23vw Arial';
    heater_on_btn = new Chemistry.Circle(new Chemistry.Point(850, 800), 18, canvas);
    heater_off_btn = new Chemistry.Circle(new Chemistry.Point(950, 800), 18, canvas);
    let img1 = new Chemistry.Custome_image(assembly, new Chemistry.Point(600, 350), 1500 * 0.75, 829 * 0.75, canvas);
    let on = new Chemistry.Geo_Text('On', new Chemistry.Point(838, 795), canvas);
    let off = new Chemistry.Geo_Text('Off', new Chemistry.Point(938, 795), canvas);
    scene.add(img1);
    scene.add(heater);
    scene.add(heater_text);
    scene.add(heater_on_btn);
    scene.add(heater_off_btn);
    scene.add(on);
    scene.add(off);
    // add canvas sizing
    window.onload = a2_windowresize;
    window.onresize = a2_windowresize;
    a2_windowresize();
}
function a2_windowresize() {
    //canvas size
    a2_canvas_size();
    //draw scene
    scene.draw();
}
function a2_canvas_size() {
    //resizing
    canvas.width = window.innerWidth * 0.91;
    canvas.height = ((canvas.width * 1080.0) / 1920) * 0.85;
    lscale = canvas.width / 1920.0;
    document.getElementById('leftpannel').style.height =
        canvas.height + 5 + 'px';
    document.getElementById('leftpannel').style.margin = '0';
    //canvas mapping
    context.translate(0, canvas.height);
    context.scale(1, -1);
}
function load_input_fields() {
    let inp_fields = `
 <div style='position: absolute;'>

 <div>
   <select onchange="least_count_select();" class='form-select' id="element" name="element" style='position: absolute; top:2.2vw; width: 23vw; background-color: black; color: white; font-size: 1.5vw;'> 
      <option selected value="">--Select the Element--</option>
   </select>
 </div>

 <br>

 <div>
   <select disabled onchange="voltage_select();" class='form-select' id="least-count" name="least-count" style='position: absolute; top:7.3vw; width: 23vw; background-color: black; color: white; font-size: 1.5vw;'> 
         <option selected value="">--Select Temp Least Count--</option>
         <option value="2">2</option>
         <option value="4">4</option>
         <option value="5">5</option>
   </select>
 </div>

 <br>

 <div>
     <label style='position: absolute; left: 16.5vw; width: 11.2vw; top: 30.5vw; font-size: 1vw; font-weight: 600; font-size: 3vw;' id='voltage-label'>V</label>

     <select disabled onchange="heater_on();" name="voltage" id="voltage" style='position: absolute; left: 1.3vw; width: 10vw; top: 32vw; border: none; background-color: black; color: white; font-size: 1vw;' >
         <option selected value="">Select the Voltage</option>
     </select>
 </div>

 <br>

 <div>
     
     <input disabled class="form-control" type="text" id="temperature" style='position: absolute; left: 20.5vw; top:14vw; width: 10vw; font-size: 1.3vw; text-align:center; background-color: black; color: white;' />
 </div>

 <br>

 <div>
     
     <input disabled class="form-control" type="button" id="temp_dec_btn" onclick='temp_dec()'; style='position: absolute; top: 14vw; left: 35vw; width: 8vw; font-size: 1.3vw; cursor:pointer; border-color:black;' value="Temp. Dec" />
 </div>

 <br>

 <div>
     
     <input disabled class="form-control" type="text" id="s_current" style='position: absolute; left: 39.5vw; width: 10vw; top: 21.5vw; font-size: 1.3vw; text-align:center; background-color: black; color: white;' />
 </div>

 </div>`;
    pp.addtoleftpannel(inp_fields);
    show_panel(3);
    pp.showdescription(`<p class='discription_text'>Select the Element</p>`, 3);
    load_act4_options();
}
function load_act4_options() {
    //for element
    let element = (document.getElementById('element'));
    for (let i = 0; i < energy_band.length; i++) {
        element.innerHTML += `<option value='${energy_band[i]['name']}'>${energy_band[i]['name'].toUpperCase()}</option>`;
    }
}
function least_count_select() {
    // a2_windowresize();
    pp.showdescription(`<p class='discription_text'>Select temp least count</p>`, 3);
    show_panel(3);
    let element = (document.getElementById('element'));
    let least_count = (document.getElementById('least-count'));
    if (element.value) {
        least_count.disabled = false;
        material = element.value;
    }
    else {
        least_count.disabled = true;
    }
}
function voltage_select() {
    pp.showdescription(`<p class='discription_text'>Select the voltage</p>`, 3);
    show_panel(3);
    let least_count = (document.getElementById('least-count'));
    let voltage = (document.getElementById('voltage'));
    if (least_count.value) {
        voltage.disabled = false;
        temp_least_count = parseInt(least_count.value);
        voltage.innerHTML = `<option value=''>Select the Voltage</option>`;
        for (let i = 1; i <= 4; i++) {
            voltage.innerHTML += `<option value='${i}'>${i + 'v'}</option>`;
        }
    }
    else {
        voltage.disabled = true;
    }
}
function heater_on() {
    pp.showdescription(`<p class='discription_text'>Turn On heater</p>`, 3);
    show_panel(3);
    canvas.addEventListener('click', a4_mouseclick_heater_on);
    let voltage = (document.getElementById('voltage'));
    let label = (document.getElementById('voltage-label'));
    if (voltage.value) {
        label.innerText = voltage.value + 'v';
        selected_voltage = parseInt(voltage.value);
        volt = 'v' + selected_voltage;
    }
}
function temp_dec() {
    let temperature = (document.getElementById('temperature'));
    let s_current = (document.getElementById('s_current'));
    let curr_temp = 0;
    if (temperature.value != '') {
        curr_temp = parseInt(temperature.value) - temp_least_count;
    }
    if (reading == 3)
        return;
    if (reading >= 2)
        pp.addtorightpannel(act4_first_btn, 3);
    for (let i = 0; i < energy_band.length; i++) {
        if (energy_band[i].name == material) {
            let indx = energy_band[i].t.indexOf(curr_temp);
            temperature.value = energy_band[i].t[indx].toString() + '℃';
            s_current.value = energy_band[i][volt][indx].toString() + ' µA';
            temp_reading.push(energy_band[i].t[indx]);
            Is_reading.push(energy_band[i][volt][indx]);
        }
    }
    reading++;
}
// function select_data() {
// 	let element: HTMLSelectElement = <HTMLSelectElement>(
// 		document.getElementById('element')
// 	);
// 	let voltage: HTMLSelectElement = <HTMLSelectElement>(
// 		document.getElementById('voltage')
// 	);
// 	let label: HTMLLabelElement = <HTMLLabelElement>(
// 		document.getElementById('voltage-label')
// 	);
// 	material = element.value;
// 	selected_voltage = parseInt(voltage.value);
// 	label.innerText = voltage.value + 'v';
// 	for (let i = 0; i < energy_band.length; i++) {
// 		if (energy_band[i].name == material) {
// 			T = energy_band[i].t;
// 			IS = energy_band[i][volt];
// 			std_band_gap = energy_band[i].band_gap;
// 			break;
// 		}
// 	}
// 	for (let i = 0; i < IS.length; i++) {
// 		IS[i] = parseFloat(std_deviation(IS[i]).toFixed(1));
// 	}
// 	IS.sort(function (a, b) {
// 		return b - a;
// 	});
// 	let temperature: HTMLInputElement = <HTMLInputElement>(
// 		document.getElementById('temperature')
// 	);
// 	let s_current: HTMLInputElement = <HTMLInputElement>(
// 		document.getElementById('s_current')
// 	);
// 	temperature.value = T[0].toString() + '℃';
// 	s_current.value = IS[0].toString() + ' µA';
// 	if (material != '' && selected_voltage != 0) {
// 		show_panel(3);
// 	}
// }
var readingtime_temp = 0;
var readingtime_ammtr = 0;
function getreadingtime() {
    let temperature = (document.getElementById('temperature'));
    let s_current = (document.getElementById('s_current'));
    if (material == 'Germanium') {
        readingtime_temp += energy_band[0].t[0] / 80;
        readingtime_ammtr =
            energy_band[0][volt][41 - (Math.ceil(readingtime_temp / 2) + 1)]; //41 is length of array
    }
    else {
        readingtime_temp += energy_band[1].t[0] / 80;
        readingtime_ammtr =
            energy_band[1][volt][41 - (Math.ceil(readingtime_temp / 2) + 1)]; //41 is length of array
    }
    temperature.value = readingtime_temp.toString() + '℃';
    s_current.value = readingtime_ammtr.toString() + ' µA';
    if (readingtime_temp >= 80) {
        pp.showdescription(`<p class='discription_text'>Turn Off heater</p>`, 3);
        show_panel(3);
        temp_reading.push(readingtime_temp);
        Is_reading.push(readingtime_ammtr);
        return;
    }
    window.requestAnimationFrame(getreadingtime);
}
function a4_mouseclick_heater_on(e) {
    let x = Math.round((e.clientX - rect.x) / lscale);
    let y = Math.round((canvas.height - (e.clientY - rect.y)) / lscale);
    console.log(x, y);
    if (y >= 790 && y <= 814) {
        if (x >= 836 && x <= 860) {
            console.log('inside button on');
            canvas.removeEventListener('click', a4_mouseclick_heater_on);
            canvas.addEventListener('click', a4_mouseclick_heater_off);
            heater_on_btn.color = 'green';
            scene.draw();
            getreadingtime();
        }
    }
}
function a4_mouseclick_heater_off(e) {
    let x = Math.round((e.clientX - rect.x) / lscale);
    let y = Math.round((canvas.height - (e.clientY - rect.y)) / lscale);
    console.log(x, y);
    let dec_btn = (document.getElementById('temp_dec_btn'));
    if (y >= 792 && y <= 814) {
        if (x >= 937 && x <= 959) {
            console.log('inside button off');
            canvas.removeEventListener('click', a4_mouseclick_heater_off);
            heater_on_btn.color = 'red';
            heater_off_btn.color = 'green';
            scene.draw();
            dec_btn.disabled = false;
            pp.showdescription(`<p class='discription_text'>Note down the four readings for temperature and ammeter. <br> For more readings click on 'Temp. Dec' button</p>`, 3);
            show_panel(3);
        }
    }
}
function act4_verify() {
    for (let i = 0; i < 4; i++) {
        let tempEle = (document.getElementById(`temp-inp-${i + 1}`));
        let IsEle = (document.getElementById(`Is-inp-${i + 1}`));
        console.log(tempEle.value);
        console.log(IsEle.value);
        T[i] = parseInt(tempEle.value);
        IS[i] = parseFloat(IsEle.value);
    }
    console.log('T', T);
    console.log('IS', IS);
    console.log('temp_reading', temp_reading);
    console.log('Is_reading', Is_reading);
    for (let i = 0; i < energy_band.length; i++) {
        if (energy_band[i].name == material) {
            std_band_gap = energy_band[i].band_gap;
            for (let j = 0; j < T.length; j++) {
                if (!verify_values(T[j], temp_reading[j])) {
                    alert(`Temperature readings are not correct!`);
                    return;
                }
                if (!verify_values(IS[j], Is_reading[j])) {
                    alert(`Saturation current readings are not correct!`);
                    return;
                }
            }
        }
    }
    alert('Observation is right!!');
    activity5();
}
// activity4();
//# sourceMappingURL=activity4.js.map