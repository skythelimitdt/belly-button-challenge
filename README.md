## Background
You will build an interactive dashboard to explore the [Belly Button Biodiversity dataset](https://robdunnlab.com/projects/belly-button-biodiversity) to an external site., which catalogs the microbes that colonize human navels.

The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

### Instructions
- Use the D3 library to read in samples.json from the URL https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json.

- Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
    - Use sample_values as the values for the bar chart.
    - Use otu_ids as the labels for the bar chart.
    - Use otu_labels as the hovertext for the chart.

- Create a bubble chart that displays each sample.
    - Use otu_ids for the x values.
    - Use sample_values for the y values.
    - Use sample_values for the marker size.
    - Use otu_ids for the marker colors.
    - Use otu_labels for the text values.

- Display the sample's metadata, i.e., an individual's demographic information.
    - Loop through each key-value pair from the metadata JSON object and create a text string.
    - Append an html tag with that text to the #sample-metadata panel

- Update the webpage when a new ID is selected from the dropdown

[Click Here to See The Webpage](https://skythelimitdt.github.io/belly-button-challenge)

#### References
chatgpt: <br>
Filter the samples for the object with the desired sample number <br>
let sampleData=metadata.filter((item) => item.id === parseInt(sample))[0];
    let sampleId=samples.filter((item) => item.id === sample.toString())[0];
Demographics information did not show properly because "id" in names element was string but "id" in metadata element was integer.After fixing with the code from chargpt, Demographics information showed properly </br>
chatgpt: <br>
.map function help:
let sortedData = sampleValues
      .map((value, index) => ({ value, label: otuLabels[index], id: otuIds[index] }))
      .slice(0, 10) // Get the top 10 values
      .sort((a, b) => a.value - b.value);
</br>
