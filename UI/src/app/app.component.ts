import { Component } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {

  constructor(
    private data: DataService) { 

    }

  searchText: any;
  outputText: any;
  select;
  entities: any[] = [];

 
  search() {
    let outMap = {}
    let inMap = {}

    let query
    if (this.searchText) {
      query = "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> " +
        "SELECT ?s ?p ?o WHERE{ ?s rdfs:label ?name . " +
        "?s ?p ?o" +
        " FILTER( regex(?name, \"" + this.searchText + "\", \"i\" ) )  }"
    } else {
      query = "SELECT * WHERE{ ?s ?p ?o . }"
    }
    this.data.sparql(query).subscribe(res => {
      this.outputText = ''
      res['results']['bindings'].forEach((triple: any) => {
        if (inMap[triple.o.value]) {
          inMap[triple.o.value] += 1
        } else {
          inMap[triple.o.value] = 1
        }
        if (outMap[triple.s.value]) {
          outMap[triple.s.value] += 1
        } else {
          outMap[triple.s.value] = 1
        }
       
        let txt: String[] = [];
        if (triple.p.value.split('#')[1] != 'type' && triple.p.value.split('#')[1] != 'label') {
          ['s', 'p', 'o'].forEach(x => {
            if (triple[x].type === 'uri') {
              txt.push("<" + triple[x].value + ">")
            } else if (triple[x].type === 'literal') {
              txt.push("\"" + triple[x].value + "\"")
            }
          })
          this.outputText += txt[0] + ' ' + txt[1] + ' ' + txt[2] + ' .\n'
        }
      })


    })
  }


 }


