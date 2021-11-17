const { Command } = require('commander')
const Commander = new Command()
const Database = require('./database');
const Heroi = require('./heroi');

async function main() {
    Commander
        .version('v1')
        .option('-n, --nome [value]', 'Nome do Heroi')
        .option('-p, --poder [value]', 'Poder do Heroi')
        .option('-i, --id [value]', 'ID do Heroi')

        .option('-c, --cadastrar', 'Cadastrar um Heroi')
        .option('-l, --listar', 'Listar Herois')
        .option('-r, --remover', 'Remove um Heroi pelo id')
        .option('-a, --atualizar [value]', 'Atualizar um Heroi pelo id')
        .parse(process.argv)

    try {
        const options = Commander.opts();
        const heroi = new Heroi(options)

        if(options.cadastrar){
            delete heroi.id
            const resultado = await Database.cadastrar(heroi)
            if(!resultado){
                console.error('Heroi não foi cadastrado')
                return
            }
            console.log('Heroi Cadastrado com sucesso')
        }
        if(options.listar) {
            const resultado = await Database.listar()
            console.log(resultado)
        }
        if(options.remover) {
            const resultado = await Database.remover(heroi.id)
            if(!resultado){
                console.error('Não foi possível remover o heroi')
            }
            console.log('Heroi removido com sucesso')
            return
        }
        if(options.atualizar){
            const idParaAtualizar = parseInt(options.atualizar)
            const dado = JSON.stringify(heroi)
            const heroiAtualizar = JSON.parse(dado)
            const resultado = await Database.atualizar(idParaAtualizar, heroiAtualizar)
            if(!resultado){
                console.error('Não foi possível atualizar o heroi')
                return
            }
            console.log('Heroi atualizado com sucesso!')

        }
    } catch (error) {
        console.error('DEU RUIM', error)
    }
    
}

main()