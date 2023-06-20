// var act4_table: Table;
// var act4_table_headings: string[] = [];
// function activity4() {
//     pp.clearleftpannel();
//     pp.clearrightpannel();
//     pp.addoffcanvas(3);
//     load_act4_table();
//     pp.showtitle("To determine viscosity using Stokes law", 3);
//     let activity5_formulae = `
//         <p>Length of Column (L) = 100 cm</p>
//         <p>Density of Steel Balls (pp) = 7.8 gm/cc</p>
//         <p>Density of Castor Liquid (pf) = 0.9 gm/cc</p>
//         <p>Density of lubricating oil (pf) = 0.9gm/cc</p>
//         <p>Ut = L/T</p>
//     `;
//     show_panel(3);
//     pp.showdescription(activity5_formulae, 3);
// }
// function load_act4_table() {
//     act4_table_headings = ["Sr No.", "Length of the column L (cm)", "Diameter of the steel ball Dp (cm)", "Time of travel between tow marks (t)", "Ultimate setting velocity Ut (cm/sec)", "Viscosity &mue; (poise)", "check"];
//     let verify_row = [["1", "100", "0.30", "5.52", `<input type="text"  id="inp-1">`, `<input type="text"  id="inp-2">`, `<input type="submit" class="btn btn-primary" onclick="verify_act4();">`]];
//     act4_table = new Table(act4_table_headings, verify_row);
//     pp.addtoleftpannel(act4_table.template);
//     act4_table.draw();
// }
// function verify_act4() {
//     let val1: HTMLInputElement = <HTMLInputElement> document.getElementById(`inp-1`);
//     let val2: HTMLInputElement = <HTMLInputElement> document.getElementById(`inp-2`);
//     if(!verify_values(parseFloat(val1.value), parseFloat(act4_table_data[0][4]))) {
//         alert(`please correct Ut value!!`);
//         return;
//     }
//     if(!verify_values(parseFloat(val2.value), parseFloat(act4_table_data[0][5]))) {
//         alert(`please correct the Viscosity of liquid value!!`);
//         return;
//     }
//     alert("Calculation is right!!");
//     act4_table_headings.pop();
//     act4_table = new Table(act4_table_headings, act4_table_data);
//     act4_table.draw();
// }
// activity4();
var std_band_gap;
var act4_first_btn = `<button id="panel1_btn" class="btn btn-primary" onclick="page_2();" style="
position: absolute; bottom: 8vh; width: 85%;">Next</button>`;
function activity4() {
    pp.clearleftpannel();
    pp.clearrightpannel();
    pp.addoffcanvas(3);
    pp.showtitle('Determine the energy band gap (Eg) of semiconductor', 3);
    load_input_fields();
}
function load_input_fields() {
    let inp_fields = `
    <div>

    <div>
        <label for="element">Element</label>
        <select onchange="select_data();" class="form-select" id="element" name="element">
            <option selected value="">--Select the Element--</option>
        </select>
    </div>

    <br>

    <div>
        <label for="voltage">Voltage</label>
        <select onchange="select_data();" class="form-select" name="voltage" id="voltage">
            <option selected value="">--Select the Voltage--</option>
        </select>
    </div>

    <br>

    <div>
        <label for="temperature">Temperature (&#8451;)</label>
        <input disabled class="form-control" type="text" id="temperature" />
    </div>

    <br>

    <div>
        <label for="s_current">Saturation Current (&mu;A)</label>
        <input disabled class="form-control" type="text" id="s_current" />
    </div>

    <br>

    <h4>Note: Please note down these readings</h4>

    </div>`;
    pp.addtoleftpannel(inp_fields);
    load_act4_options();
}
function load_act4_options() {
    //for element
    let sel_1 = document.getElementById('element');
    for (let i = 0; i < energy_band.length; i++) {
        sel_1.innerHTML += `<option value='${energy_band[i]["name"]}'>${(energy_band[i]["name"]).toUpperCase()}</option>`;
    }
    //for voltage
    let sel_2 = document.getElementById('voltage');
    for (let i = 1; i <= 4; i++) {
        sel_2.innerHTML += `<option value='${i}'>${i + "v"}</option>`;
    }
    pp.addtorightpannel(act4_first_btn, 3);
    //for temperature
    //for saturation current
}
function select_data() {
    let element = document.getElementById('element');
    let voltage = document.getElementById('voltage');
    material = element.value;
    selected_voltage = parseInt(voltage.value);
    for (let i = 0; i < energy_band.length; i++) {
        if (energy_band[i].name == material) {
            T = energy_band[i].t;
            IS = energy_band[i]["v" + selected_voltage];
            std_band_gap = energy_band[i].band_gap;
            break;
        }
    }
    for (let i = 0; i < IS.length; i++) {
        IS[i] = parseFloat(std_deviation(IS[i]).toFixed(1));
    }
    IS.sort(function (a, b) { return b - a; });
    let temperature = document.getElementById('temperature');
    let s_current = document.getElementById('s_current');
    temperature.value = T[0].toString();
    s_current.value = IS[0].toString();
    if (material != '' && selected_voltage != 0) {
        show_panel(3);
    }
}
function load_page_2() {
    if (material != '' && selected_voltage != 0) {
        page_2();
    }
}
function page_2() {
    hide_panel(3);
    pp.clearleftpannel();
    document.getElementById('panel1_btn').remove();
    let headings = ["Sr No.", "Temperature (&#8451;)", "Saturation Current I<sub>s</sub> (&mu;A)", "check"];
    let verify_row = [["1", "<input type='number' class='form-control' id='temp-verify' />", "<input type='number' class='form-control' id='amp-verify' />", `<input type="submit" class="btn btn-primary" onclick="act4_verify_pg2();">`]];
    let table = new Table(headings, verify_row);
    pp.addtoleftpannel(table.template);
    table.draw();
    console.log("IS => ", IS);
    console.log("T => ", T);
}
function act4_verify_pg2() {
    let val1 = document.getElementById(`temp-verify`);
    let val2 = document.getElementById(`amp-verify`);
    if (!verify_values(parseFloat(val1.value), T[0])) {
        alert(`please correct Ut value!!`);
        return;
    }
    if (!verify_values(parseFloat(val2.value), IS[0])) {
        alert(`please correct the Viscosity of liquid value!!`);
        return;
    }
    alert("Calculation is right!!");
    activity5();
}
activity4();
//# sourceMappingURL=activity4.js.map