const knex = require("../database/knex");

class MovieNotesController{

    async create(request,response){
        const {title,description,rating,tags} = request.body;
        const user_id = request.user.id;

        const [note_id] = await knex("movie_notes").insert({
            title,
            description,
            rating,
            user_id
        });
        
        const tagsInsert = tags.map(name =>{
            return {
                note_id,
                user_id,
                name
            }
        });

        await knex("movie_tags").insert(tagsInsert);
        
        response.json();
    }

    async show(request,response){
        const {id} = request.params;

        const movie = await knex("movie_notes").where({id}).first();
        const tags = await knex("movie_tags").where({note_id: id}).orderBy("name");

        return response.json({
            ...movie,
            tags,
        })
    }

    async index(request,response){
        const {title, tags} = request.query;
        const user_id = request.user.id;

        let notes;

        if(tags){
            const filterTags = tags.split(',').map(tag => tag.trim());
         
            notes = await knex("movie_tags")
            .select([
                "movie_notes.id","movie_notes.title","movie_notes.user_id",
            ])
            .where("movie_notes.user_id",user_id)
            .whereLike("title",`%${title}%`)
            .whereIn("name",filterTags)
            .innerJoin("movie_notes","movie_notes.id","movie_tags.note_id")
            .orderBy("movie_notes.title");
        }else{
            notes = await knex("movie_notes").where({user_id}).whereLike("title",`%${title}%`).orderBy("title");
        }
    
       

        const userTags = await knex("movie_tags").where({user_id});


        const movieNotesWithTags = notes.map(note => {
            const movieTags = userTags.filter(tag => tag.note_id === note.id);
            return {...note,tags:movieTags}
        });
        

        return response.json(movieNotesWithTags);

    }

    async delete(request,response){
        const {id} = request.params;

        await knex("movie_notes").where({id}).delete();

        return response.json();
    }

}

module.exports = MovieNotesController;