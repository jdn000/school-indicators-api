SELECT
       i.id,
       i.name,
       i.description,
       i.objective_id AS "objectiveId",
       i.status,
  (CASE WHEN ca.is_cummulative=TRUE
           THEN ( json_agg(DISTINCT  jsonb_strip_nulls( jsonb_build_object(
            'value',cc.value,
         'id',ci.calification_id,
               'alumnId',cc.alumn_id,
          'isCummulative',true
               ))))
           ELSE  (json_agg(DISTINCT  jsonb_strip_nulls( jsonb_build_object(
            'value',alc.value,
         'id',alc.id,
               'alumnId',alc.alumn_id,
               'isCummulative',false ))))
      END)  AS "califications"

FROM ${ schema~ }.indicator i
LEFT JOIN  ${ schema~ }.calification_indicator ci
    on i.id=ci.indicator_id
LEFT JOIN ${ schema~ }.cummulative_calification cc
    on ci.calification_id = cc.id
LEFT JOIN ${ schema~ }.learning_objective lo
    on i.objective_id = lo.id
LEFT JOIN ${ schema~ }.calification ca
ON lo.id=ca.objective_id
LEFT JOIN alumn_calification alc
ON ca.id=alc.id_calification
WHERE i.objective_id = ${objectiveId}

GROUP BY i.id,i.name,i.description,i.objective_id,i.status,ca.is_cummulative
