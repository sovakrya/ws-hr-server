/**
 * task-link controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::task-link.task-link",
  ({ strapi }) => {
    return {
      async create(ctx) {
        const body = JSON.parse(ctx.request.body);
        const tasks = await strapi.documents("api::task.task").findMany({
          filters: {
            speciality: {
              documentId: {
                $eq: body.speciality,
              },
            },
          },
        });

        const uuid = crypto.randomUUID();

        const response = strapi.documents("api::task-link.task-link").create({
          data: {
            uuid: uuid,
            validity: true,
            task: tasks[Math.round(Math.random() * (tasks.length - 1))],
          },
        });

        

        return response;
      },

      

    };
  }
);
