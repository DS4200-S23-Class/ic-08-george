const FRAME_HEIGHT = 500;
const FRAME_WIDTH = 500; 
const MARGINS = {left: 100, right: 50, top: 50, bottom: 50};


//###############################################################
// Binding svg's to data  
// The real power of d3 for building visualization comes from
// the fact that it allows us to bind data to svg's. 
//###############################################################



//###############################################################
// Mapping pixels to data   
// In addition to binding data to svg's d3 will do the math 
// to map data values to pixel values.  
//###############################################################

// Let's make a vis with the following data 
const data = [55000, 48000, 27000, 66000, 90000]; 

// We would need an extremely large screen to use data2 values
// as our cx values. In order for our vis to work on (almost) 
// any screen, we need to be able to map (i.e. scale) our data
// values to pixel values. 

// Start with a new frame. This time, we will also set a constant
// for the width and height of our vis
const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right; 

const FRAME3 = d3.select("#vis1")
                  .append("svg")
                    .attr("height", FRAME_HEIGHT)
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame"); 

// Now, let's define our scaling function

// find max X
const MAX_Y = d3.max(data2, (d) => { return d; }); 
console.log("Max Y: " +MAX_Y);  

// Now, define scale functions that maps our data values 
// (domain) to pixel values (range)
const Y_SCALE = d3.scaleLinear() // linear scale because we have 
                              // linear data 
                  .domain([0, (MAX_Y + 10000)]) // add some padding  
                  .range([0, VIS_HEIGHT]); 

console.log("Input: 40000, Y_SCALE output: " + Y_SCALE(40000));

// Now, we can use Y_SCALE to plot our points
FRAME3.selectAll("points")  
    .data(data2)  
    .enter()       
    .append("line")  
      .attr("cx", MARGINS.left + 50) 
      .attr("cy", (d) => { return (Y_SCALE(d) + MARGINS.top); }) 
      .attr("class", "point"); 

// We can also use Y_SCALE to add an axis to the vis  
FRAME3.append("g") // g is a "placeholder" svg
      .attr("transform", "translate(" + MARGINS.left + 
            "," + MARGINS.top + ")") //moves axis 
                                                    // within margins 
      .call(d3.axisLeft(Y_SCALE).ticks(4)) // function for generating axis  
        .attr("font-size", '20px'); // set font size



