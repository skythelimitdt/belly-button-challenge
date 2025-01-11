// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    console.log("Metadata field:", data.metadata);
    // get the metadata field
    let metadata=data.metadata;

    // Filter the metadata for the object with the desired sample number
    let sampleData=metadata.filter((item) => item.id === parseInt(sample))[0];
    console.log(`Filtered metadata for sample ${sample}:`, sampleData);

    // Use d3 to select the panel with id of `#sample-metadata`
    let panel = d3.select("#sample-metadata");
    
    // Use `.html("") to clear any existing metadata
    panel.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    Object.entries(sampleData).forEach(([key, value]) => {
        console.log(`Appending metadata: ${key}: ${value}`);
        // Append a new paragraph for each key-value pair
        panel.append("p")
          .text(`${key}: ${value}`); // Set the text content to "key: value"
      });
    });
  }


// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    let samples=data.samples;

    // Filter the samples for the object with the desired sample number
    let sampleId=samples.filter((item) => item.id === sample.toString())[0];

    // Get the otu_ids, otu_labels, and sample_values
    let otuIds=sampleId.otu_ids;
    let otuLabels=sampleId.otu_labels;
    let sampleValues=sampleId.sample_values;
    console.log("OTU IDs:", otuIds);
    console.log("OTU Labels:", otuLabels);
    console.log("Sample Values:", sampleValues);
    // Build a Bubble Chart
    let trace1={
        x: otuIds,
        y: sampleValues,
        text: otuLabels,
        mode: 'markers',
        marker: {
            size: sampleValues,
            color: otuIds,
            colorscale: "Earth"
        }
     };
     // Layout for the bubble chart
    let layout = {
        title: "Bacteria Cultures Per Sample",
        xaxis: { title: "OTU ID" },
        yaxis: { title: "Number of Bacteria" },
        showlegend: false,        // Hide the legend
      };
    // Render the Bubble Chart
    Plotly.newPlot("bubble", [trace1], layout);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    let otuIdsAsStrings = otuIds.map(id => `OTU ${id}`);

    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    let sortedData = sampleValues
      .map((value, index) => ({ value, label: otuLabels[index], id: otuIds[index] }))
      .slice(0, 10) // Get the top 10 values
      .sort((a, b) => a.value - b.value);
      
    // Extract the top 10 sample values, labels, and ids for the bar chart
    let topSampleValues = sortedData.map(d => d.value);
    let topOtuLabels = sortedData.map(d => d.label);
    let topOtuIds = sortedData.map(d => `OTU ${d.id}`);


    // Create the trace for the bar chart
    let trace2 = {
        x: topSampleValues,          // Sample values for the x-axis
        y: topOtuIds,                // OTU IDs as the y-axis (yticks)
        text: topOtuLabels,          // OTU labels for hover text
        type: "bar",                 // Bar chart type
        orientation: "h",            // Horizontal bar chart
        marker: {
          color: "rgba(0, 123, 255, 0.6)" // Color for bars
        }
      };
    // Layout for the bar chart
    let layout2 = {
        title: "Top 10 Bacteria Cultures Found",
        xaxis: { title: "Number of Bacteria" }
        
      };
    // Render the Bar Chart
    Plotly.newPlot("bar", [trace2], layout2);
  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    let sampleNames=data.names;

    // Use d3 to select the dropdown with id of `#selDataset`
    let dropdownMenu=d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    sampleNames.forEach((sample) => {
        dropdownMenu.append("option")  // Add a new <option> tag
          .text(sample)                // Set the text for the option
          .property("value", sample);  // Set the value attribute for the option
      });
    

    // Get the first sample from the list
    let firstSample = sampleNames[0];

    // Build charts and metadata panel with the first sample
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
