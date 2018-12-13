// Custom Style Script 0.1.2

// this will log to the console when the values of forms' controls are queried
for( let f = 0; f < document.forms.length; f++ ) {
  let frm = document.forms[f];
//  console.log( frm );
  for( let i = 0; i < frm.elements.length; i++ ) {
    let ot = frm.elements.item(i);
	if( ot instanceof HTMLInputElement ) {
//console.log( frm, '; ot: ', ot );
// thanks to: https://qiita.com/lhankor_mhy/items/9e6522c5b257fba2c0e6
//  and: https://stackoverflow.com/a/36397984
//  and: https://hiddentao.com/archives/2013/07/08/generate-overridable-getters-and-setters-in-javascript/
Object.defineProperty(ot, 'value',{
  get : function(x){
	let v2;
	vval = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').get.call(ot);
	try {
      v2 = vval.toString().slice(0, 100)
    } catch (b) {
      v2 = "null"
    }
	console.log('*** .value getter() on frm [' + ot.form.id + '] ot [' + ot.id + '] value: ', v2, '; x: ', x);
	//console.trace();
	return vval;
  }
//  ,set : function(x){
//	console.log(x);
//	Object.getOwnPropertyDescriptor( HTMLInputElement.prototype, 'value' ).set.call( ot, x );
//  }
});
    }
  }
}

//
String.prototype.slice = function( start, end ) {
  //vret = this.slice(start,end);
  let vret = '';

  //console.log( '*** slice', start, end, ('\'' + this + '\'') );
  
  if( !start && !end ) {
    vret = this;
  }
  else {
    let islen;
    if( !end ) {
	  islen = this.length;
	}
	else {
	  islen = start + end;
	}

    //console.log( '*** slice', start, end, islen );

    for( let i = start; i < islen; i++ ) {
	  vret += this.charAt(i);
	}
  }  
  //if( start && end && (99 < (end-start)) ) {
    console.log( '*** slice', start, end, ('\'' + vret + '\''), ('\'' + this + '\'') );
    console.trace();
  //}
  return vret;
};
