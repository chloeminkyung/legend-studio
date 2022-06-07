/**
 * Copyright (c) 2020-present, Goldman Sachs
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import type { Notifier } from './DSLPersistence_Notifier';
import type { Persister } from './DSLPersistence_Persister';
import type { Trigger } from './DSLPersistence_Trigger';
import type { PersistenceTestSuite } from './DSLPersistence_PersistenceTestSuite';
import { PERSISTENCE_HASH_STRUCTURE } from '../../../../../DSLPersistence_ModelUtils';
import {
  PackageableElement,
  type PackageableElementReference,
  type PackageableElementVisitor,
  type Service,
  type Testable,
  type Test,
} from '@finos/legend-graph';
import { type Hashable, hashArray } from '@finos/legend-shared';

export const DEFAULT_PERSISTENCE_PATTERN = '/';

export class Persistence
  extends PackageableElement
  implements Hashable, Testable
{
  documentation!: string;
  trigger!: Trigger;
  service!: PackageableElementReference<Service>;
  persister!: Persister;
  notifier!: Notifier;
  tests: Test[] = [];
  testSuites: PersistenceTestSuite[] = [];

  protected override get _elementHashCode(): string {
    return hashArray([
      PERSISTENCE_HASH_STRUCTURE.PERSISTENCE,
      this.documentation,
      this.trigger,
      this.service.hashValue,
      this.persister,
      this.notifier,
      hashArray(this.testSuites),
    ]);
  }

  accept_PackageableElementVisitor<T>(
    visitor: PackageableElementVisitor<T>,
  ): T {
    return visitor.visit_PackageableElement(this);
  }
}
