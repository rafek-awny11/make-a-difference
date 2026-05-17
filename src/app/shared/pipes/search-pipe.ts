// import { Pipe, PipeTransform } from '@angular/core';


// @Pipe({
//   name: 'search'
// })
// export class SearchPipe implements PipeTransform {

//   transform(arr:any[] , figo:string): any[] {
//     return arr.filter((Event)=>Event.name.toLowerCase().includes(figo.toLowerCase()));
//   }

// }
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) return [];  // <-- prevent undefined
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter(item => 
      Object.values(item).some(val => 
        val?.toString().toLowerCase().includes(searchText)
      )
    );
  }
}