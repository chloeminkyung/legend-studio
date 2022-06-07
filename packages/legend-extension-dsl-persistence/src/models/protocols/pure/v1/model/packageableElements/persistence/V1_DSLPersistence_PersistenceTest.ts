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

import { hashArray, type Hashable } from '@finos/legend-shared';
import { CORE_HASH_STRUCTURE } from '@finos/legend-graph';
import { V1_AtomicTest } from '../../../../../../../../../legend-graph/src/models/protocols/pure/v1/model/test/V1_AtomicTest';
import type { V1_ParameterValue } from './V1_DSLPersistence_ParameterValue';
import type { V1_TestData } from './V1_DSLPersistence_TestData';

export class V1_PersistenceTest extends V1_AtomicTest implements Hashable {
  testData!: V1_TestData;
  parameters: V1_ParameterValue[] = [];

  get hashCode(): string {
    return hashArray([
      CORE_HASH_STRUCTURE.PERSISTENCE_TEST,
      this.id,
      this.testData,
      hashArray(this.parameters),
      hashArray(this.assertions),
    ]);
  }
}
