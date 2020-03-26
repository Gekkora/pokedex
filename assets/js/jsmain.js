$(function () {
  $('#buscarDatos').click(function (event) {

    event.preventDefault();
    const nombrePokemon = $('#buscar').val();
    console.log(nombrePokemon);
    const nombrePokemonLower = nombrePokemon.toLowerCase();

    $.ajax({
      url: `https://pokeapi.co/api/v2/pokemon/${nombrePokemonLower}`,
      success: function (respuesta) {
        console.log(respuesta);
      },
      error: function () {
        console.log("No se ha podido obtener la información");
      }
    }).done(response);

    function response(data) {
      var nombrePokemon = data.name;
      var imagePokemon = data.sprites.front_shiny;
      var habilidadPokemon = data.abilities;
      var tipoPokemon = data.types;
      var numeroPokemon = data.order;

      for (i = 0; i < data.abilities.length; i++) {
        habilidadPokemon[i] = habilidadPokemon[i].ability.name;
      }
      for (var i = 0; i < data.types.length; i++) {
        tipoPokemon[i] = tipoPokemon[i].type.name;
      }


      var cajaPokemon = $('#pokemon_ver');
      cajaPokemon.html(''); //borar busqueda anterior
      cajaPokemon.append(`<div class="card" style="width: 18rem;">
          <img src="${imagePokemon}" class="card-img-top" alt="${nombrePokemon}">
          <div class="list-group list-group-flush">
          <h5 class="list-group-item">Número : ${numeroPokemon}</h5>
            <h5 class="list-group-item">Nombre : ${nombrePokemon}</h5>
            <h5 class="list-group-item">Habilidad :<br> ${habilidadPokemon}</h5>
            <h5 class="list-group-item">Tipo : <br>${tipoPokemon}</h5>
          </div>
        </div>`);    
        

        var chart = new CanvasJS.Chart("chartContainer", {
          theme: "light2", // "light1", "light2", "dark1", "dark2"
          exportEnabled: true,
          animationEnabled: true,
          title: {
            text: 'Status Pokemon'
          },
          data: [{
            type: "pie",
     /*        startAngle: 5, */
            toolTipContent: "<b>{label}</b>: {y}%",
            /* showInLegend: "true", */
           /*  legendText: "{label}", */
     /*        indexLabelFontSize: 16,
            indexLabel: "{label} - {y}%", */
            dataPoints: [
              { y: data.stats[0].base_stat, label: "Velocidad" },
              { y: data.stats[1].base_stat, label: "Defensa Especial" },
              { y: data.stats[2].base_stat, label: "Ataque Especial" },
              { y: data.stats[3].base_stat, label: "Defensa" },
              { y: data.stats[0].base_stat, label: "Ataque" },
              { y: data.stats[1].base_stat, label: "HP" },
            ]
          }]
        });
        chart.render();
      
        










    }





  });
})