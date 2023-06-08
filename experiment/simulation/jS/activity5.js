// var act5_table: Table;
// var act5_table_headings: string[] = [];
// var capillary_tube_dia = 0.3357;
// var capillary_tube_length = 18.4;
// var density_of_liquid = 1.11;
// var g = 9.81;
// var area_od_test_tank = 255;
// function activity5() {
//     pp.clearleftpannel();
//     pp.clearrightpannel();
//     pp.addoffcanvas(3);
//     load_act5_table();
//     pp.showtitle("To determine the diffusivity of one liquid in the other", 3);
//     let activity5_formulae = `
//         <p>Diameter of capillary tube (d) = 0.3357 cm</p>
//         <p>Length of the capillary tube (L) = 18.4 cm</p>
//         <p>Density of the liquid (&rho;) = 1.11 gm/ml</p>
//         <p>Gravitational Acceleration (g) = 9.81 m/sec<sup>2</sup></p>
//         <p>Area of the Tank = 255cm<sup>2</sup></p>
//     `;
//     show_panel(3);
//     pp.showdescription(activity5_formulae, 3);
// }
// function load_act5_table() {
//     act5_table_headings = ["Sr No.", "Time &Theta; (hr)", "C<sub>1</sub>(N)", "C<sub>2</sub>(N)", "C<sub>3</sub>(N)", "&Delta; C<sub>m</sub>", "D<sub>L</sub> x 10<sup>9</sup> (m<sup>2</sup>/sec)", "check"];
//     let verify_row = [["1", "25", "1", "0.73", "0.03", `<input type="text" id="inp-1">`, `<input type="text"  id="inp-2">`, `<input type="submit" class="btn btn-primary" onclick="verify_act5();">`]]
//     act5_table = new Table(act5_table_headings, verify_row);
//     pp.addtoleftpannel(act5_table.template);
//     act5_table.draw();
// }
// function verify_act5() {
//     let val1: HTMLInputElement = <HTMLInputElement> document.getElementById(`inp-1`);
//     let val2: HTMLInputElement = <HTMLInputElement> document.getElementById(`inp-2`);
//     if(!verify_values(parseFloat(val1.value), parseFloat(act5_table_data[0][5]))) {
//         alert(`please check ${act5_table_headings[5]}`);
//         return;
//     }
//     if(!verify_values(parseFloat(val2.value), parseFloat(act5_table_data[0][6]))) {
//         alert(`please check ${act5_table_headings[6]}`);
//         return;
//     }
//     alert("all values are right!!");
//     act5_table_headings.pop();
//     act5_table = new Table(act5_table_headings, act5_table_data);
//     act5_table.draw();
// }
var act5_first_btn = `<button id="panel1_btn" class="btn btn-primary" onclick="draw_chart();" style="
position: absolute; bottom: 8vh; width: 85%;">Next</button>`;
var act5_col_headings;
function activity5() {
    pp.clearleftpannel();
    create_table_data();
    act5_col_headings = ["Sr No", `Temperature (&#8451;)`, `Saturation Current I<sub>s</sub> (&mu;A)`, `T (K)`, `1000/T`, `log<sub>10</sub>(I<sub>s</sub>)`];
    // let verify_row = [["1", `${T[0]}`, `${IS[0]}`, `<input type="number" id="tk" class="form-control" />`,`<input type="number" id="dbt" class="form-control" />`, `<input type="number" id="lnis" class="form-control" />`, `<input type="submit" class="btn btn-primary" onclick="verify_main_table();">`]]
    // let table = new Table(act5_col_headings, verify_row);
    // pp.addtoleftpannel(table.template);
    // table.draw();
    complete_main_table();
}
function create_table_data() {
    let arr = [];
    for (let i = 0; i < T.length; i++) {
        arr = [];
        arr[0] = i + 1;
        arr[1] = T[i];
        arr[2] = IS[i];
        arr[3] = 273 + T[i];
        arr[4] = 1000 / arr[3];
        arr[5] = Math.log10(IS[i]);
        main_table_data[i] = arr;
    }
    console.log(main_table_data);
}
function verify_main_table() {
    let val1 = document.getElementById(`tk`);
    let val2 = document.getElementById(`dbt`);
    let val3 = document.getElementById(`lnis`);
    if (!verify_values(parseFloat(val1.value), main_table_data[0][3])) {
        alert(`please check ${act5_col_headings[3]}`);
        return;
    }
    if (!verify_values(parseFloat(val2.value), main_table_data[0][4])) {
        alert(`please check ${act5_col_headings[4]}`);
        return;
    }
    if (!verify_values(parseFloat(val3.value), main_table_data[0][5])) {
        alert(`please check ${act5_col_headings[5]}`);
        return;
    }
    alert("all values are right!!");
    act5_col_headings.pop();
    complete_main_table();
}
function complete_main_table() {
    pp.clearleftpannel();
    let str_data = [];
    for (let i = 0; i < main_table_data.length; i++) {
        let temp = [];
        temp[0] = main_table_data[i][0].toString();
        temp[1] = main_table_data[i][1].toString();
        temp[2] = main_table_data[i][2].toString();
        temp[3] = main_table_data[i][3].toString();
        temp[4] = main_table_data[i][4].toFixed(4);
        temp[5] = main_table_data[i][5].toFixed(4);
        str_data.push(temp);
    }
    let table = new Table(act5_col_headings, str_data);
    pp.addtoleftpannel(table.template);
    table.draw();
    pp.showdescription("click on next to plot graph", 3);
    pp.addtorightpannel(act5_first_btn, 3);
}
//# sourceMappingURL=activity5.js.map