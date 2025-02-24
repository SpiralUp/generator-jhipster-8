/**
 * Copyright 2013-2023 the original author or authors from the JHipster project.
 *
 * This file is part of the JHipster project, see https://www.jhipster.tech/
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { clientApplicationTemplatesBlock } from '../client/support/files.mjs';
import { CLIENT_MAIN_SRC_DIR } from '../generator-constants.mjs';

export const entityFiles = {
  client: [
    {
      ...clientApplicationTemplatesBlock('shared/model/'),
      path: `${CLIENT_MAIN_SRC_DIR}app/entities/_entityFolder/`,
      templates: ['_entityModel.model.ts'],
    },
    {
      condition: generator => !generator.embedded,
      ...clientApplicationTemplatesBlock(),
      templates: [
        'entities/_entityFolder/_entityFile-details.vue',
        'entities/_entityFolder/_entityFile-details.component.ts',
        'entities/_entityFolder/_entityFile-details.component.spec.ts',
        'entities/_entityFolder/_entityFile.vue',
        'entities/_entityFolder/_entityFile.component.ts',
        'entities/_entityFolder/_entityFile.component.spec.ts',
        'entities/_entityFolder/_entityFile.service.ts',
        'entities/_entityFolder/_entityFile.service.spec.ts',
      ],
    },
    {
      condition: generator => !generator.readOnly && !generator.embedded,
      ...clientApplicationTemplatesBlock(),
      templates: [
        'entities/_entityFolder/_entityFile-update.vue',
        'entities/_entityFolder/_entityFile-update.component.ts',
        'entities/_entityFolder/_entityFile-update.component.spec.ts',
      ],
    },
  ],
};

export async function writeEntityFiles({ application, entities }) {
  for (const entity of entities.filter(entity => !entity.skipClient && !entity.builtIn)) {
    await this.writeFiles({
      sections: entityFiles,
      context: { ...application, ...entity },
    });
  }
}

export async function postWriteEntityFiles({ application, entities }) {
  for (const entity of entities.filter(entity => !entity.skipClient && !entity.builtIn)) {
    if (!entity.embedded) {
      const { enableTranslation } = application;
      const {
        entityInstance,
        entityClass,
        entityAngularName,
        entityFolderName,
        entityFileName,
        entityUrl,
        microserviceName,
        readOnly,
        entityClassPlural,
        i18nKeyPrefix,
        pageTitle = enableTranslation ? `${i18nKeyPrefix}.home.title` : entityClassPlural,
      } = entity;

      this.addEntityToModule(
        entityInstance,
        entityClass,
        entityAngularName,
        entityFolderName,
        entityFileName,
        entityUrl,
        microserviceName,
        readOnly,
        pageTitle,
      );
      this.addEntityToMenu(entity.entityPage, application.enableTranslation, entity.entityTranslationKeyMenu, entity.entityClassHumanized);
    }
  }
}

export function cleanupEntitiesFiles({ application, entities }) {
  for (const entity of entities.filter(entity => !entity.skipClient && !entity.builtIn)) {
    const { entityFolderName, entityFileName } = entity;
    if (this.isJhipsterVersionLessThan('8.0.0-beta.3')) {
      this.removeFile(`${application.clientTestDir}/spec/app/entities/${entityFolderName}/${entityFileName}.component.spec.ts`);
      this.removeFile(`${application.clientTestDir}/spec/app/entities/${entityFolderName}/${entityFileName}-detail.component.spec.ts`);
      this.removeFile(`${application.clientTestDir}/spec/app/entities/${entityFolderName}/${entityFileName}-update.component.spec.ts`);
      this.removeFile(`${application.clientTestDir}/spec/app/entities/${entityFolderName}/${entityFileName}.service.spec.ts`);
    }
  }
}
