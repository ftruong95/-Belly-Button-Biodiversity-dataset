function getPlots(id) {
//Import samples.json
    d3.json("samples.json").then (jsondata =>{
        console.log(jsondata)
    var ids = jsondata.samples[0].otu_ids;
        console.log(ids)
    var sampleValues =  jsondata.samples[0].sample_values.slice(0,10).reverse();
        console.log(sampleValues)
    var labels =  jsondata.samples[0].otu_labels.slice(0,10);
        console.log (labels)

// Top 10 otu ids 
    var OTU_top = ( jsondata.samples[0].otu_ids.slice(0, 10)).reverse();
    var OTU_id = OTU_top.map(d => "OTU " + d);
            console.log(`OTU IDS: ${OTU_id}`)
    var labels =  jsondata.samples[0].otu_labels.slice(0,10);
            console.log(`OTU_labels: ${labels}`)
    var trace = {
            x: sampleValues,
            y: OTU_id,
            text: labels,
            marker: {
            color: 'green'},
            type:"bar",
            orientation: "h",
            };
        
// Create data variable and layout
    var data = [trace];
    var layout = {
        title: "Top 10 OTUs",
        yaxis:{
            tickmode:"linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 50,
            }
            };

// Bar plot
    Plotly.newPlot("bar", data, layout);
    var bar_plot = {
        x: jsondata.samples[0].otu_ids,
        y: jsondata.samples[0].sample_values,
        mode: "markers",
        marker: {
            size: jsondata.samples[0].sample_values,
            color: jsondata.samples[0].otu_ids
        },
        text:  jsondata.samples[0].otu_labels

    };

// Bubble plot
    var bubble_plot = {
        xaxis:{title: "OTU ID"},
        height: 1000,
        width: 1000
    };
    var bubble_data = [bar_plot];
    Plotly.newPlot("bubble", bubble_data, bubble_plot); 
    });
    }  

// Function to pull necessay data
    function getDemoInfo(id) {
    d3.json("samples.json").then((data)=> {
        var metadata = data.metadata;
        console.log(metadata)
        var result = metadata.filter(meta => meta.id.toString() === id)[0];
        var demographicInfo = d3.select("#sample-metadata");
        demographicInfo.html("");
        Object.entries(result).forEach((key) => {   
            demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
        });
    });
}
// Function to change events
function optionChanged(id) {
    getPlots(id);
    getDemoInfo(id);
}

// Initial data rendering
function init() {
    var dropdown = d3.select("#selDataset");
    d3.json("samples.json").then((data)=> {
        console.log(data)
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });
        getPlots(data.names[0]);
        getDemoInfo(data.names[0]);
    });
}
init();