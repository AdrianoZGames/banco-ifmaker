fetch("api/usuarios")

. então ( resposta => resposta . json ( ) )
. então ( ( dados ) => {
    // let pessoas = document.querySelector('#pessoas');
    let  tabela  =  document . querySelector ( "#tabela" )
    for ( deixe  o item  de  dados ) {
        deixe  tr  =  documento . criarElemento ( 'tr' )

        deixe  tdId  =  documento . criarElemento ( 'td' )
        tdId . textContent  =  item . eu ia
        deixe  tdNome  =  documento . criarElemento ( 'td' )
        tdNome . textContent  =  item . nome
        let  tdIdade  =  document . criarElemento ( 'td' )
        tdIdade . textContent  =  item . idade

        tr . appendChild ( tdId )
        tr . appendChild ( tdNome )
        tr . appendChild ( tdIdade )


        //Adicionando um botão de excluir por linha da tabela
        let  aExcluir  =  document . criarElemento ( 'a' )
        aExcluir . textContent  =  "Excluir"
        aExcluir . classList . add ( "excluir" )

        //Adicionando uma ação ao clicar no botão
        aExcluir . addEventListener ( 'clique' , ( evento ) => {
            evento . prevenirPadrão ( ) ;
            fetch ( "http://localhost:3000" + '/' + item . id , {
                método : 'DELETE'
            } )
            . finalmente ( ( ) => {
                // window.location.reload();
            } )
        } )

        let  tdBotaoExcluir  =  document . criarElemento ( 'td' )
        tdBotaoExcluir . appendChild ( aExcluir )


        let  tdBotaoAlterar  =  document . criarElemento ( 'td' )
        let  aAlterar  =  document . criarElemento ( 'a' )
        aAlterar . classList . add ( "alterar" )
        aAlterar . textContent = "Alterar"

        aAlterar . addEventListener ( 'clique' , ( evento ) => {
            evento . prevenirPadrão ( )
            // O que precisamos fazer aqui?/

            documento . consultaSeletor ( "#id" ) . valor  =  artigo . eu ia
            documento . querySelector ( "#nome" ) . valor  =  artigo . nome
            documento . querySelector ( "#idade" ) . valor  =  artigo . idade
            documento . querySelector ( 'botão' ) . textContent  = "Alterar"

            deixe  formulário  =  documento . querySelector ( '#form-cadastro' )
            forma . addEventListener ( 'enviar' , ( evento ) => {
                evento . prevenirPadrão ( ) ;
                deixe  id  =  documento . querySelector ( '#id' ) . valor
                deixe  nome  =  documento . querySelector ( '#nome' ) . valor
                let  idade  =  document . querySelector ( '#idade' ) . valor
                let  pessoaUpdate  =  {
                    identificação ,
                    nome ,
                    idade
                }
                fetch ( "http://localhost:3000" + "/" + item . id , {
                    método : "PUT" ,
                    cabeçalhos : {
                        'Tipo de conteúdo' : 'aplicativo/json'
                    } ,
                    corpo : JSON . stringify ( pessoaUpdate )
                } )
                . finalmente ( ( ) => {
                    // window.location.reload();
                } )
                
            } )
        } )

        tdBotaoAlterar . appendChild ( aAlterar )


        tr . appendChild ( tdBotaoAlterar )
        tr . appendChild ( tdBotaoExcluir )

        tabela . appendChild ( tr )
    }
} )
deixe  formulário  =  documento . querySelector ( "#formulário-cadastro" ) ;

forma . addEventListener ( 'enviar' , ( evento ) => {
evento . prevenirPadrão ( ) ;

if ( document . querySelector ( 'button' ) . textContent  == "Alterar" ) {
    retornar
}
deixe  id  =  documento . consultaSeletor ( "#id" ) . valor ;
deixe  nome  =  documento . querySelector ( "#nome" ) . valor ;
let  idade  =  document . querySelector ( "#idade" ) . valor ;
deixa  pessoa  =  {
    identificação ,
    nome ,
    idade
}
//console.log(pessoa)
buscar ( "http://localhost:3000" , {
    //Método
    método : 'POST' ,
    //Tipo de dado
    cabeçalhos : {
        'Tipo de conteúdo' : 'aplicativo/json'
    } ,
    //Quais são os dados
    corpo : JSON . stringify ( pessoa )
} )
. então ( resposta => resposta . json ( ) )
} ) ;











